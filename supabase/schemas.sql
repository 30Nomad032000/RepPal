-- create table profiles
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  first_name text,
  last_name text,
  avatar_url text,
  referral_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  gym_bro_id uuid references profiles(id) on delete set null,
  status text default 'Offline'
);

