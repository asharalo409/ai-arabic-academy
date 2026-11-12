-- ==============================================================================
-- AI Arabic Academy — Production PostgreSQL Schema for Supabase (Free Tier)
-- ==============================================================================

-- 1. Student Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null default 'Student',
  preferred_language text not null default 'bn' check (preferred_language in ('bn', 'en', 'ar')),
  preferred_theme text not null default 'emerald' check (preferred_theme in ('emerald', 'midnight', 'academic')),
  daily_goal_minutes integer not null default 20,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 2. Gamification & Learning Progress Table
create table if not exists public.user_progress (
  user_id uuid references auth.users on delete cascade primary key,
  xp integer not null default 0,
  streak integer not null default 1,
  study_minutes integer not null default 0,
  completed_lessons text[] not null default '{}',
  learned_vocab text[] not null default '{}',
  favorite_vocab text[] not null default '{}',
  last_active_date date not null default current_date,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Users can manage own progress"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3. Quiz & Examination History Table
create table if not exists public.quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  quiz_title text not null,
  score integer not null,
  total_questions integer not null,
  created_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

create policy "Users can manage own quiz attempts"
  on public.quiz_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 4. Dynamic Curriculum & Lessons Table (Scalable up to 1,000+ Lessons)
create table if not exists public.curriculum_lessons (
  id text primary key,
  level_number integer not null check (level_number between 1 and 6),
  chapter_number integer not null check (chapter_number between 1 and 100),
  lesson_number integer not null check (lesson_number between 1 and 10),
  title_bn text not null,
  title_en text not null,
  title_ar text not null,
  grammar_title_bn text,
  grammar_explanation_bn text,
  vocabulary_json jsonb not null default '[]'::jsonb,
  dialogue_json jsonb not null default '[]'::jsonb,
  quiz_json jsonb not null default '[]'::jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.curriculum_lessons enable row level security;

create policy "Anyone can read published lessons"
  on public.curriculum_lessons for select
  using (is_published = true);
