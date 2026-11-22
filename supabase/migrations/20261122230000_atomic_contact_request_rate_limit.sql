create or replace function public.submit_contact_request(
  p_name text,
  p_email text,
  p_project_type text,
  p_message text
)
returns text
language plpgsql
security definer
set search_path = pg_catalog, pg_temp
as $function$
declare
  v_email text := pg_catalog.lower(pg_catalog.btrim(p_email));
  v_checked_at timestamptz;
  v_recent_count integer;
begin
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_email, 0)
  );

  -- Set the window only after acquiring the lock so wait time cannot stale it.
  v_checked_at := pg_catalog.clock_timestamp();

  if exists (
    select 1
    from public.contact_requests as request
    where request.email = v_email
      and request.message = p_message
      and request.created_at >= v_checked_at - interval '15 minutes'
  ) then
    return 'duplicate';
  end if;

  select pg_catalog.count(*)::integer
  into v_recent_count
  from (
    select 1
    from public.contact_requests as request
    where request.email = v_email
      and request.created_at >= v_checked_at - interval '15 minutes'
    limit 3
  ) as recent_requests;

  if v_recent_count >= 3 then
    return 'rate_limited';
  end if;

  insert into public.contact_requests (
    name,
    email,
    project_type,
    message,
    created_at
  ) values (
    p_name,
    v_email,
    p_project_type,
    p_message,
    v_checked_at
  );

  return 'accepted';
end;
$function$;

alter function public.submit_contact_request(text, text, text, text)
  owner to postgres;

revoke all on function public.submit_contact_request(text, text, text, text)
  from public, anon, authenticated, service_role;
grant execute on function public.submit_contact_request(text, text, text, text)
  to service_role;
