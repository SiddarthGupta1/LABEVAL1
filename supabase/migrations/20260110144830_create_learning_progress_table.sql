/*
  # Create Learning Progress Tables

  1. New Tables
    - `user_sessions`
      - `id` (uuid, primary key)
      - `session_start` (timestamptz) - When the session started
      - `created_at` (timestamptz)
    
    - `learning_progress`
      - `id` (uuid, primary key)
      - `session_id` (uuid) - References user_sessions
      - `module` (text) - Module name (counting, shapes, social_skills)
      - `activity` (text) - Specific activity within module
      - `success` (boolean) - Whether the gesture was recognized successfully
      - `attempts` (integer) - Number of attempts made
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (since this is an educational app without user auth)
*/

CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_start timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES user_sessions(id),
  module text NOT NULL,
  activity text NOT NULL,
  success boolean DEFAULT false,
  attempts integer DEFAULT 1,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to sessions"
  ON user_sessions FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to sessions"
  ON user_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to progress"
  ON learning_progress FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to progress"
  ON learning_progress FOR INSERT
  WITH CHECK (true);