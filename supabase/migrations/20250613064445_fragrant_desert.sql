/*
  # MS-721 Learning System Database Schema

  1. New Tables
    - `learning_modules`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `difficulty` (text)
      - `estimated_time` (integer)
      - `created_at` (timestamp)
    
    - `exam_questions`
      - `id` (uuid, primary key)
      - `module_id` (uuid, foreign key)
      - `question_text` (text)
      - `options` (jsonb)
      - `correct_answer` (integer)
      - `explanation` (text)
      - `scenario` (text)
      - `difficulty` (text)
      - `tags` (text[])
      - `exam_objective` (text)
      - `created_at` (timestamp)
    
    - `practical_tasks`
      - `id` (uuid, primary key)
      - `question_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `steps` (jsonb)
      - `component` (text)
      - `expected_result` (text)
      - `hints` (text[])
      - `created_at` (timestamp)
    
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `module_id` (uuid, foreign key)
      - `questions_completed` (integer)
      - `score` (numeric)
      - `time_spent` (integer)
      - `last_accessed` (timestamp)
      - `attempts` (integer)
      - `created_at` (timestamp)
    
    - `practice_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `session_type` (text)
      - `questions_answered` (integer)
      - `correct_answers` (integer)
      - `time_taken` (integer)
      - `score` (numeric)
      - `completed_at` (timestamp)
      - `created_at` (timestamp)
    
    - `dashboard_activities`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `activity_type` (text)
      - `component` (text)
      - `description` (text)
      - `status` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Learning Modules
CREATE TABLE IF NOT EXISTS learning_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  estimated_time integer DEFAULT 60,
  icon text,
  color text,
  prerequisites text[],
  objectives text[],
  created_at timestamptz DEFAULT now()
);

-- Exam Questions
CREATE TABLE IF NOT EXISTS exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES learning_modules(id),
  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  explanation text NOT NULL,
  scenario text,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  tags text[],
  exam_objective text,
  source text,
  created_at timestamptz DEFAULT now()
);

-- Practical Tasks
CREATE TABLE IF NOT EXISTS practical_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES exam_questions(id),
  title text NOT NULL,
  description text NOT NULL,
  steps jsonb NOT NULL,
  component text NOT NULL,
  expected_result text,
  hints text[],
  validation_criteria jsonb,
  created_at timestamptz DEFAULT now()
);

-- User Progress
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  module_id uuid REFERENCES learning_modules(id),
  questions_completed integer DEFAULT 0,
  score numeric DEFAULT 0,
  time_spent integer DEFAULT 0,
  last_accessed timestamptz DEFAULT now(),
  attempts integer DEFAULT 0,
  status text DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Practice Sessions
CREATE TABLE IF NOT EXISTS practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  session_type text NOT NULL CHECK (session_type IN ('quick_practice', 'full_exam', 'module_test', 'scenario')),
  module_id uuid REFERENCES learning_modules(id),
  questions_answered integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  time_taken integer DEFAULT 0,
  score numeric DEFAULT 0,
  completed boolean DEFAULT false,
  results jsonb,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Dashboard Activities
CREATE TABLE IF NOT EXISTS dashboard_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  activity_type text NOT NULL,
  component text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  metadata jsonb DEFAULT '{}',
  practical_task_id uuid REFERENCES practical_tasks(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practical_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read learning modules"
  ON learning_modules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read exam questions"
  ON exam_questions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read practical tasks"
  ON practical_tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own progress"
  ON user_progress FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their own practice sessions"
  ON practice_sessions FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their own dashboard activities"
  ON dashboard_activities FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());