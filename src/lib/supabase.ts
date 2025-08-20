import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_time: number;
  icon: string;
  color: string;
  prerequisites: string[];
  objectives: string[];
  created_at: string;
}

export interface ExamQuestion {
  id: string;
  module_id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  scenario?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  exam_objective: string;
  source: string;
  created_at: string;
}

export interface PracticalTask {
  id: string;
  question_id: string;
  title: string;
  description: string;
  steps: Array<{
    step: number;
    action: string;
    description: string;
  }>;
  component: string;
  expected_result: string;
  hints: string[];
  validation_criteria: Record<string, any>;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  module_id: string;
  questions_completed: number;
  score: number;
  time_spent: number;
  last_accessed: string;
  attempts: number;
  status: 'not_started' | 'in_progress' | 'completed';
  created_at: string;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  session_type: 'quick_practice' | 'full_exam' | 'module_test' | 'scenario';
  module_id?: string;
  questions_answered: number;
  correct_answers: number;
  time_taken: number;
  score: number;
  completed: boolean;
  results: Record<string, any>;
  completed_at?: string;
  created_at: string;
}

export interface DashboardActivity {
  id: string;
  user_id: string;
  activity_type: string;
  component: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  metadata: Record<string, any>;
  practical_task_id?: string;
  created_at: string;
}