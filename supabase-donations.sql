create table donations (
  id text primary key default gen_random_uuid()::text,
  amount numeric not null,
  name text,
  message text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index donations_status_idx on donations (status);
create index donations_created_at_idx on donations (created_at desc);

-- Service role key bypasses RLS by default, but enabling RLS with no public
-- policies keeps the table locked down against the anon/public key.
alter table donations enable row level security;
