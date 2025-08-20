import { useState, useEffect } from 'react';
import { supabase, LearningModule, ExamQuestion, PracticalTask, UserProgress } from '../lib/supabase';

export const useLearningData = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [practicalTasks, setPracticalTasks] = useState<PracticalTask[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLearningData();
  }, []);

  const fetchLearningData = async () => {
    try {
      setLoading(true);
      
      // Fetch modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('learning_modules')
        .select('*')
        .order('created_at');

      if (modulesError) throw modulesError;

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('exam_questions')
        .select('*')
        .order('created_at');

      if (questionsError) throw questionsError;

      // Fetch practical tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('practical_tasks')
        .select('*')
        .order('created_at');

      if (tasksError) throw tasksError;

      // Fetch user progress - use mock data if no authenticated user
      let progressData: UserProgress[] = [];
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;
        
        if (userId) {
          const { data, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId);

          if (!progressError) {
            progressData = data || [];
          }
        } else {
          // Use mock progress data for demonstration
          progressData = [
            {
              id: 'mock-prog-001',
              user_id: 'mock-user',
              module_id: 'mod-001',
              questions_completed: 2,
              score: 2,
              time_spent: 1800,
              last_accessed: new Date().toISOString(),
              attempts: 1,
              status: 'in_progress',
              created_at: new Date().toISOString()
            },
            {
              id: 'mock-prog-002',
              user_id: 'mock-user',
              module_id: 'mod-005',
              questions_completed: 1,
              score: 1,
              time_spent: 900,
              last_accessed: new Date().toISOString(),
              attempts: 1,
              status: 'in_progress',
              created_at: new Date().toISOString()
            }
          ];
        }
      } catch (progressError) {
        // Use mock data if there's an error
        progressData = [
          {
            id: 'mock-prog-001',
            user_id: 'mock-user',
            module_id: 'mod-001',
            questions_completed: 2,
            score: 2,
            time_spent: 1800,
            last_accessed: new Date().toISOString(),
            attempts: 1,
            status: 'in_progress',
            created_at: new Date().toISOString()
          }
        ];
      }

      setModules(modulesData || []);
      setQuestions(questionsData || []);
      setPracticalTasks(tasksData || []);
      setUserProgress(progressData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProgress = async (moduleId: string, questionsCompleted: number, score: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      if (userId) {
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: userId,
            module_id: moduleId,
            questions_completed: questionsCompleted,
            score: score,
            time_spent: questionsCompleted * 300, // 5 minutes per question
            last_accessed: new Date().toISOString(),
            attempts: 1,
            status: questionsCompleted === questions.filter(q => q.module_id === moduleId).length ? 'completed' : 'in_progress'
          });

        if (error) throw error;
        
        // Refresh progress data after update
        await fetchLearningData();
      } else {
        // Update mock data for demonstration
        const existingProgressIndex = userProgress.findIndex(p => p.module_id === moduleId);
        const newProgress = {
          id: `mock-prog-${moduleId}`,
          user_id: 'mock-user',
          module_id: moduleId,
          questions_completed: questionsCompleted,
          score: score,
          time_spent: questionsCompleted * 300, // 5 minutes per question
          last_accessed: new Date().toISOString(),
          attempts: 1,
          status: questionsCompleted === questions.filter(q => q.module_id === moduleId).length ? 'completed' as const : 'in_progress' as const,
          created_at: new Date().toISOString()
        };

        if (existingProgressIndex >= 0) {
          const updatedProgress = [...userProgress];
          updatedProgress[existingProgressIndex] = newProgress;
          setUserProgress(updatedProgress);
        } else {
          setUserProgress([...userProgress, newProgress]);
        }
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const createPracticeSession = async (sessionType: 'quick_practice' | 'full_exam' | 'module_test' | 'scenario', moduleId?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      if (userId) {
        const { data, error } = await supabase
          .from('practice_sessions')
          .insert({
            user_id: userId,
            session_type: sessionType,
            module_id: moduleId,
            questions_answered: 0,
            correct_answers: 0,
            time_taken: 0,
            score: 0,
            completed: false
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Return mock session for demonstration
        return {
          id: `mock-session-${Date.now()}`,
          user_id: 'mock-user',
          session_type: sessionType,
          module_id: moduleId,
          questions_answered: 0,
          correct_answers: 0,
          time_taken: 0,
          score: 0,
          completed: false,
          results: null,
          completed_at: null,
          created_at: new Date().toISOString()
        };
      }
    } catch (err) {
      console.error('Error creating practice session:', err);
      return null;
    }
  };

  const updatePracticeSession = async (sessionId: string, updates: Partial<{
    questions_answered: number;
    correct_answers: number;
    time_taken: number;
    score: number;
    completed: boolean;
    results: Record<string, any>;
  }>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      if (userId) {
        const updateData = {
          ...updates,
          ...(updates.completed && { completed_at: new Date().toISOString() })
        };

        const { error } = await supabase
          .from('practice_sessions')
          .update(updateData)
          .eq('id', sessionId)
          .eq('user_id', userId);

        if (error) throw error;
      }
    } catch (err) {
      console.error('Error updating practice session:', err);
    }
  };

  const logDashboardActivity = async (activityType: string, component: string, description: string, metadata?: Record<string, any>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      if (userId) {
        const { error } = await supabase
          .from('dashboard_activities')
          .insert({
            user_id: userId,
            activity_type: activityType,
            component: component,
            description: description,
            status: 'completed',
            metadata: metadata || {}
          });

        if (error) throw error;
      }
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  };

  const getQuestionsForModule = (moduleId: string) => {
    return questions.filter(q => q.module_id === moduleId);
  };

  const getPracticalTasksForQuestion = (questionId: string) => {
    return practicalTasks.filter(t => t.question_id === questionId);
  };

  const getProgressForModule = (moduleId: string) => {
    return userProgress.find(p => p.module_id === moduleId);
  };

  return {
    modules,
    questions,
    practicalTasks,
    userProgress,
    loading,
    error,
    updateUserProgress,
    createPracticeSession,
    updatePracticeSession,
    logDashboardActivity,
    getQuestionsForModule,
    getPracticalTasksForQuestion,
    getProgressForModule,
    refetch: fetchLearningData
  };
};