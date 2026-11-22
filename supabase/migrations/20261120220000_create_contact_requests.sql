create table public.contact_requests (
    id uuid primary key default gen_random_uuid(),
    name text not null
        check (char_length(btrim(name)) between 2 and 80),
    email text not null
        check (char_length(email) between 3 and 254),
    project_type text
        check (project_type is null or char_length(project_type) <= 80),
    message text not null
        check (char_length(btrim(message)) between 20 and 2000),
    created_at timestamptz not null default now()
);

alter table public.contact_requests enable row level security;
