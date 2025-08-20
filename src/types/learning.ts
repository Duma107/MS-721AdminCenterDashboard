export interface Question {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  scenario?: string;
  practicalTask?: {
    description: string;
    steps: string[];
    component: string;
  };
  tags?: string[];
  examObjective?: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: Question[];
  completed: boolean;
  score?: number;
  estimatedTime?: number;
  prerequisites?: string[];
}

export interface UserProgress {
  moduleId: string;
  questionsCompleted: number;
  score: number;
  timeSpent: number;
  lastAccessed: Date;
  attempts: number;
}

export interface PracticeTest {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  attempts: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number;
  objectives: string[];
  prerequisites: string[];
  steps: ScenarioStep[];
  validation: ValidationCriteria[];
}

export interface ScenarioStep {
  id: string;
  title: string;
  description: string;
  component: string;
  action: string;
  expectedResult: string;
  hints?: string[];
}

export interface ValidationCriteria {
  id: string;
  description: string;
  checkFunction: string;
  points: number;
}