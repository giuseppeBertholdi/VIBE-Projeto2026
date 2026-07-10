"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ConversationMessage, UserLevel } from "@/types";

type ConnectionState = "idle" | "connecting" | "connected" | "error" | "disconnected";

interface UseRealtimeOptions {
  artworkId: string;
  artworkTitle: string;
  systemPrompt?: string;
  userLevel?: UserLevel;
  onTranscript?: (text: string, role: "user" | "assistant") => void;
  onAudioLevel?: (level: number) => void;
}

export function useRealtime({
  artworkId,
  artworkTitle,
  systemPrompt,
  userLevel = "ADULT",
  onTranscript,
  onAudioLevel,
}: UseRealtimeOptions) {
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const addMessage = useCallback((role: "user" | "assistant", content: string) => {
    const msg: ConversationMessage = {
      id: `${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, msg]);
    onTranscript?.(content, role);
  }, [onTranscript]);

  const buildSystemPrompt = useCallback(() => {
    const levelInstructions = {
      CHILD: "Explique como se estivesse falando com uma criança de 8-10 anos: use palavras simples, analogias do cotidiano, histórias divertidas e muita imaginação.",
      TEEN: "Explique para um adolescente: seja direto, use referências culturais contemporâneas, conecte com o presente e evite ser condescendente.",
      ADULT: "Explique com profundidade para um adulto curioso: forneça contexto histórico, análise e conexões com o mundo atual.",
      EXPERT: "Você está conversando com um especialista em história da arte: use terminologia técnica, mencione fontes primárias, compare movimentos artísticos e explore nuances.",
    };

    return `${systemPrompt || `Você é um especialista mundial em história da arte, guiando o usuário pela obra "${artworkTitle}".`}

NÍVEL DO USUÁRIO: ${levelInstructions[userLevel]}

INSTRUÇÕES:
- Fale em português brasileiro de forma natural e envolvente
- Use pausas naturais para respirar e criar suspense
- Quando mencionar detalhes visuais específicos da obra, descreva-os vividamente
- Seja apaixonado e entusiasmado pela arte
- Responda perguntas diretamente e depois expanda com informações fascinantes
- Revele curiosidades surpreendentes que poucos guias contam
- Conecte a obra com eventos históricos e a vida cotidiana da época

OBRA ATUAL: ${artworkTitle}
ID: ${artworkId}`;
  }, [artworkId, artworkTitle, systemPrompt, userLevel]);

  const connect = useCallback(async () => {
    if (connectionState === "connected" || connectionState === "connecting") return;
    setConnectionState("connecting");
    setError(null);

    try {
      const tokenRes = await fetch("/api/realtime/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId }),
      });

      if (!tokenRes.ok) {
        const body = await tokenRes.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || "Falha ao obter token de sessão");
      }
      const tokenData = await tokenRes.json();
      const ephemeralKey: string = tokenData.value;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      if (!remoteAudioRef.current) {
        remoteAudioRef.current = new Audio();
        remoteAudioRef.current.autoplay = true;
      }

      pc.ontrack = (e) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = e.streams[0];
        }
        setIsAISpeaking(true);
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => pc.addTrack(t, stream));

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      const monitorAudio = () => {
        if (!analyserRef.current) return;
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        const normalized = Math.min(avg / 50, 1);
        onAudioLevel?.(normalized);
        setIsUserSpeaking(normalized > 0.1);
        animFrameRef.current = requestAnimationFrame(monitorAudio);
      };
      monitorAudio();

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.onopen = () => {
        setConnectionState("connected");
        const sessionUpdate = {
          type: "session.update",
          session: {
            type: "realtime",
            instructions: buildSystemPrompt(),
            audio: {
              input: {
                format: { type: "audio/pcm", rate: 24000 },
                transcription: { model: "whisper-1" },
                turn_detection: {
                  type: "server_vad",
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 1000,
                },
              },
              output: {
                format: { type: "audio/pcm", rate: 24000 },
                voice: "alloy",
              },
            },
          },
        };
        dc.send(JSON.stringify(sessionUpdate));

        setTimeout(() => {
          dc.send(JSON.stringify({
            type: "conversation.item.create",
            item: {
              type: "message",
              role: "user",
              content: [{ type: "input_text", text: `Olá! Estou aqui para aprender sobre "${artworkTitle}". Por favor, me faça uma introdução apaixonante desta obra.` }],
            },
          }));
          dc.send(JSON.stringify({ type: "response.create" }));
        }, 500);
      };

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);
          handleRealtimeEvent(event);
        } catch {
          // ignore parse errors
        }
      };

      dc.onclose = () => {
        setConnectionState("disconnected");
        setIsAISpeaking(false);
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch(
        "https://api.openai.com/v1/realtime/calls",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      );

      if (!sdpRes.ok) {
        const errText = await sdpRes.text().catch(() => "");
        console.error("SDP error:", sdpRes.status, errText);
        let detail = "";
        try {
          detail = JSON.parse(errText)?.error?.message || "";
        } catch { /* not JSON */ }
        if (sdpRes.status === 429) {
          throw new Error(
            detail
              ? `Limite de uso da OpenAI atingido: ${detail}`
              : "Limite de conexões simultâneas da OpenAI atingido. Aguarde alguns instantes e tente novamente."
          );
        }
        throw new Error(
          detail
            ? `Falha ao conectar com OpenAI Realtime: ${detail}`
            : `Falha ao conectar com OpenAI Realtime (${sdpRes.status})`
        );
      }
      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro de conexão";
      setError(msg);
      setConnectionState("error");
      cleanup();
    }
  }, [connectionState, artworkId, artworkTitle, buildSystemPrompt, onAudioLevel]);

  const handleRealtimeEvent = useCallback((event: { type: string; [key: string]: unknown }) => {
    switch (event.type) {
      case "response.audio_transcript.delta": {
        const delta = event.delta as string;
        setCurrentTranscript(prev => prev + delta);
        break;
      }
      case "response.audio_transcript.done": {
        const transcript = event.transcript as string;
        if (transcript) addMessage("assistant", transcript);
        setCurrentTranscript("");
        setIsAISpeaking(false);
        break;
      }
      case "conversation.item.input_audio_transcription.completed": {
        const transcript = event.transcript as string;
        if (transcript) addMessage("user", transcript);
        break;
      }
      case "response.audio.delta":
        setIsAISpeaking(true);
        break;
      case "response.done":
        setIsAISpeaking(false);
        break;
      case "error": {
        const errorData = event.error as { message?: string };
        console.error("Realtime error:", errorData);
        break;
      }
    }
  }, [addMessage]);

  const sendMessage = useCallback((text: string) => {
    if (!dcRef.current || dcRef.current.readyState !== "open") return;
    dcRef.current.send(JSON.stringify({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text }],
      },
    }));
    dcRef.current.send(JSON.stringify({ type: "response.create" }));
    addMessage("user", text);
  }, [addMessage]);

  const interrupt = useCallback(() => {
    if (!dcRef.current || dcRef.current.readyState !== "open") return;
    dcRef.current.send(JSON.stringify({ type: "response.cancel" }));
    setIsAISpeaking(false);
  }, []);

  const cleanup = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    if (pcRef.current) pcRef.current.close();
    pcRef.current = null;
    dcRef.current = null;
    audioContextRef.current = null;
    analyserRef.current = null;
  }, []);

  const disconnect = useCallback(() => {
    cleanup();
    setConnectionState("disconnected");
    setIsAISpeaking(false);
    setIsUserSpeaking(false);
  }, [cleanup]);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    connect,
    disconnect,
    sendMessage,
    interrupt,
    connectionState,
    messages,
    currentTranscript,
    isAISpeaking,
    isUserSpeaking,
    error,
  };
}
