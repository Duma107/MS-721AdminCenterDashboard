import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Target, 
  CheckCircle, 
  Clock, 
  Award,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Brain,
  FileText,
  Users,
  Phone,
  Video,
  Monitor,
  Network,
  BarChart3,
  AlertCircle,
  Star,
  TrendingUp,
  Zap,
  Lightbulb,
  ChevronRight,
  X,
  Shield,
  Activity,
  Home,
  Headphones,
  Wrench
} from 'lucide-react';
import { useLearningData } from '../hooks/useLearningData';
import { ExamQuestion, PracticalTask } from '../lib/supabase';

interface QuestionWithTasks extends ExamQuestion {
  practicalTasks: PracticalTask[];
}

const LearningCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [activePractical, setActivePractical] = useState<PracticalTask | null>(null);
  const [practicalStep, setPracticalStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<ExamQuestion[]>([]);
  const [practiceMode, setPracticeMode] = useState<'quick' | 'full' | 'module' | null>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);

  const {
    modules,
    questions,
    practicalTasks,
    loading,
    error,
    updateUserProgress,
    getQuestionsForModule,
    updatePracticeSession,
    logDashboardActivity,
    getPracticalTasksForQuestion,
    getProgressForModule,
    createPracticeSession
  } = useLearningData();

  const tabs = [
    { id: 'overview', label: 'Learning Overview' },
    { id: 'modules', label: 'Study Modules' },
    { id: 'practice', label: 'Practice Tests' },
    { id: 'scenarios', label: 'Real Scenarios' },
    { id: 'progress', label: 'Progress Tracking' },
  ];

  // Timer for test mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testMode && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testMode, timeRemaining]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    setShowExplanation(true);
    
    const question = getCurrentQuestion();
    const isCorrect = selectedAnswer === question?.correct_answer;
    
    // Update progress
    if (currentModule) {
      const moduleQuestions = getQuestionsForModule(currentModule);
      const currentProgress = getProgressForModule(currentModule);
      const questionsCompleted = Math.max((currentProgress?.questions_completed || 0), currentQuestion + 1);
      const newScore = isCorrect ? (currentProgress?.score || 0) + 1 : (currentProgress?.score || 0);
      
      await updateUserProgress(currentModule, questionsCompleted, newScore);
      
      // Log activity
      await logDashboardActivity(
        'question_answered',
        'learning',
        `Answered question in ${modules.find(m => m.id === currentModule)?.title}`,
        { 
          question_id: question?.id,
          correct: isCorrect,
          module_id: currentModule
        }
      );
    }
    
    // Update practice session if in practice mode
    if (currentSession && practiceMode) {
      const timeElapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      const questionsAnswered = currentQuestion + 1;
      const correctAnswers = (currentSession.correct_answers || 0) + (isCorrect ? 1 : 0);
      const score = (correctAnswers / questionsAnswered) * 100;
      
      await updatePracticeSession(currentSession.id, {
        questions_answered: questionsAnswered,
        correct_answers: correctAnswers,
        time_taken: timeElapsed,
        score: score,
        completed: questionsAnswered === practiceQuestions.length,
        results: {
          total_questions: practiceQuestions.length,
          correct: correctAnswers,
          percentage: Math.round(score)
        }
      });
    }
  };

  const handleNextQuestion = () => {
    const moduleQuestions = currentModule ? getQuestionsForModule(currentModule) : practiceQuestions;
    if (currentQuestion < moduleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getCurrentQuestion = (): QuestionWithTasks | null => {
    let question: ExamQuestion | null = null;
    
    if (currentModule) {
      const moduleQuestions = getQuestionsForModule(currentModule);
      question = moduleQuestions[currentQuestion];
    } else if (practiceQuestions.length > 0) {
      question = practiceQuestions[currentQuestion];
    }
    
    if (!question) return null;
    
    return {
      ...question,
      practicalTasks: getPracticalTasksForQuestion(question.id)
    };
  };

  const startPracticeTest = async (type: 'quick' | 'full' | 'module', moduleId?: string) => {
    setPracticeMode(type);
    let selectedQuestions: ExamQuestion[] = [];
    
    switch (type) {
      case 'quick':
        // Random 15 questions from all modules
        selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 15);
        setTimeRemaining(900); // 15 minutes
        break;
      case 'full':
        // All questions, simulating full exam
        selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 60);
        setTimeRemaining(3600); // 60 minutes
        setTestMode(true);
        break;
      case 'module':
        if (moduleId) {
          selectedQuestions = getQuestionsForModule(moduleId);
          setTimeRemaining(selectedQuestions.length * 90); // 1.5 minutes per question
        }
        break;
    }
    
    setPracticeQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setSessionStartTime(Date.now());
    
    // Create practice session in database
    const session = await createPracticeSession(type === 'module' ? 'module_test' : type === 'quick' ? 'quick_practice' : 'full_exam', moduleId);
    setCurrentSession(session);
    
    // Log activity
    await logDashboardActivity(
      'practice_started',
      'learning',
      `Started ${type} practice test`,
      { 
        session_type: type,
        module_id: moduleId,
        questions_count: selectedQuestions.length
      }
    );
  };

  const startPracticalTask = (task: PracticalTask) => {
    setActivePractical(task);
    setPracticalStep(0);
    setCompletedSteps([]);
    setShowHints(false);
    
    // Log activity
    logDashboardActivity(
      'practical_started',
      'learning',
      `Started practical: ${task.title}`,
      { practical_id: task.id }
    );
  };

  const nextPracticalStep = () => {
    if (activePractical && practicalStep < activePractical.steps.length - 1) {
      setPracticalStep(practicalStep + 1);
    }
  };

  const completeStep = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
      
      // Log step completion
      if (activePractical) {
        logDashboardActivity(
          'practical_step_completed',
          'learning',
          `Completed step ${stepNumber} in ${activePractical.title}`,
          { 
            practical_id: activePractical.id,
            step_number: stepNumber,
            total_steps: activePractical.steps.length
          }
        );
      }
    }
    
    if (activePractical && stepNumber < activePractical.steps.length) {
      setPracticalStep(stepNumber);
    }
  };

  const closePractical = () => {
    // Log practical completion if all steps done
    if (activePractical && completedSteps.length === activePractical.steps.length) {
      logDashboardActivity(
        'practical_completed',
        'learning',
        `Completed practical: ${activePractical.title}`,
        { 
          practical_id: activePractical.id,
          steps_completed: completedSteps.length,
          completion_rate: 100
        }
      );
    }
    
    setActivePractical(null);
    setPracticalStep(0);
    setCompletedSteps([]);
    setShowHints(false);
  };

  const exitPracticeMode = () => {
    // Log practice session completion
    if (currentSession && practiceMode) {
      const timeElapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      logDashboardActivity(
        'practice_completed',
        'learning',
        `Completed ${practiceMode} practice test`,
        { 
          session_id: currentSession.id,
          questions_answered: currentQuestion + 1,
          time_taken: timeElapsed,
          practice_type: practiceMode
        }
      );
    }
    
    setPracticeMode(null);
    setPracticeQuestions([]);
    setCurrentSession(null);
    setSessionStartTime(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTestMode(false);
    setTimeRemaining(3600);
  };

  const renderQuestionInterface = () => {
    const question = getCurrentQuestion();
    if (!question) return null;

    const isInPracticeMode = practiceMode !== null;
    const totalQuestions = isInPracticeMode ? practiceQuestions.length : getQuestionsForModule(currentModule!).length;

    return (
      <div className="space-y-6">
        {/* Practical Task Overlay */}
        {activePractical && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{activePractical.title}</h2>
                    <p className="text-gray-600 mt-1">{activePractical.description}</p>
                  </div>
                  <button
                    onClick={closePractical}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Steps */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Practical Steps</h3>
                    <div className="space-y-4">
                      {activePractical.steps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            completedSteps.includes(step.step)
                              ? 'border-green-500 bg-green-50'
                              : practicalStep === index
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                              completedSteps.includes(step.step)
                                ? 'bg-green-500 text-white'
                                : practicalStep === index
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {completedSteps.includes(step.step) ? '✓' : step.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{step.action}</h4>
                              <p className="text-sm text-gray-600">{step.description}</p>
                              {practicalStep === index && !completedSteps.includes(step.step) && (
                                <button
                                  onClick={() => completeStep(step.step)}
                                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                                >
                                  Mark as Complete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hints and Progress */}
                  <div className="space-y-6">
                    {/* Progress */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed Steps</span>
                          <span>{completedSteps.length}/{activePractical.steps.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${(completedSteps.length / activePractical.steps.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hints */}
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
                          Hints
                        </h4>
                        <button
                          onClick={() => setShowHints(!showHints)}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          {showHints ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      {showHints && (
                        <div className="space-y-2">
                          {activePractical.hints.map((hint, index) => (
                            <div key={index} className="text-sm text-yellow-800 flex items-start">
                              <span className="w-4 h-4 rounded-full bg-yellow-200 text-yellow-800 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                {index + 1}
                              </span>
                              {hint}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Expected Result */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Expected Result</h4>
                      <p className="text-sm text-blue-800">{activePractical.expected_result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Question Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {question.difficulty}
              </span>
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {question.source}
              </span>
              {isInPracticeMode && (
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {practiceMode === 'quick' ? 'Quick Practice' : 
                   practiceMode === 'full' ? 'Full Exam' : 'Module Test'}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {(testMode || isInPracticeMode) && (
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </div>
              )}
              {isInPracticeMode && (
                <button
                  onClick={exitPracticeMode}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Exit Practice
                </button>
              )}
            </div>
          </div>

          {question.scenario && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Scenario:</h4>
              <p className="text-blue-800 text-sm">{question.scenario}</p>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-4">{question.question_text}</h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correct_answer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-blue-500 bg-blue-50'
                    : showExplanation && index === question.correct_answer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>

          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Explanation:</h4>
                <p className="text-gray-700 text-sm">{question.explanation}</p>
              </div>

              {question.exam_objective && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">Exam Objective:</h4>
                  <p className="text-purple-800 text-sm">{question.exam_objective}</p>
                </div>
              )}

              {question.practicalTasks.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Hands-on Practice:</h4>
                  <div className="space-y-2">
                    {question.practicalTasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => startPracticalTask(task)}
                        className="w-full p-3 text-left bg-white border border-blue-200 rounded-lg hover:border-blue-400 transition-colors"
                      >
                        <h5 className="font-medium text-blue-900 mb-1">{task.title}</h5>
                        <p className="text-sm text-blue-700">{task.description}</p>
                        <div className="flex items-center mt-2 text-blue-600">
                          <Play className="w-4 h-4 mr-1" />
                          <span className="text-sm">Start Practical Exercise</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart {isInPracticeMode ? 'Practice' : 'Module'}
                </button>
                {currentQuestion < totalQuestions - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  >
                    Next Question
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (isInPracticeMode) {
                        exitPracticeMode();
                      } else {
                        setCurrentModule(null);
                        
                        // Log module completion
                        if (currentModule) {
                          const moduleQuestions = getQuestionsForModule(currentModule);
                          const progress = getProgressForModule(currentModule);
                          logDashboardActivity(
                            'module_completed',
                            'learning',
                            `Completed module: ${modules.find(m => m.id === currentModule)?.title}`,
                            { 
                              module_id: currentModule,
                              questions_completed: progress?.questions_completed || 0,
                              total_questions: moduleQuestions.length,
                              score: progress?.score || 0
                            }
                          );
                        }
                      }
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  >
                    Complete {isInPracticeMode ? 'Practice' : 'Module'}
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading learning content...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">Error loading learning content: {error}</span>
          </div>
        </div>
      );
    }

    if (currentModule || practiceMode) {
      return renderQuestionInterface();
    }

    switch (activeTab) {
      case 'modules':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const moduleQuestions = getQuestionsForModule(module.id);
                const progress = getProgressForModule(module.id);
                const progressPercentage = moduleQuestions.length > 0 
                  ? ((progress?.questions_completed || 0) / moduleQuestions.length) * 100 
                  : 0;

                const iconMap: Record<string, any> = {
                  'Phone': Phone,
                  'Video': Video,
                  'Monitor': Monitor,
                  'Network': Network,
                  'Users': Users,
                  'BarChart3': BarChart3,
                  'Shield': Shield,
                  'Zap': Zap,
                  'Home': Home,
                  'Headphones': Headphones,
                  'Wrench': Wrench
                };

                const Icon = iconMap[module.icon] || BookOpen;

                return (
                  <div key={module.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-${module.color}-100 mr-4`}>
                        <Icon className={`w-6 h-6 text-${module.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress?.questions_completed || 0}/{moduleQuestions.length} questions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-${module.color}-500`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">{moduleQuestions.length} questions</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        module.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentModule(module.id);
                          setCurrentQuestion(0);
                          setSelectedAnswer(null);
                          setShowExplanation(false);
                         
                         // Log module start
                         logDashboardActivity(
                           'module_started',
                           'learning',
                           `Started module: ${module.title}`,
                           { module_id: module.id }
                         );
                        }}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-${module.color}-600 text-white hover:bg-${module.color}-700 flex items-center justify-center`}
                      >
                        {(progress?.questions_completed || 0) === 0 ? 'Start' : 'Continue'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                      <button
                        onClick={() => startPracticeTest('module', module.id)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Test
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Test Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Quick Practice (15 questions)</h4>
                  <p className="text-sm text-gray-600 mb-4">Mixed questions from all modules</p>
                  <button 
                    onClick={() => startPracticeTest('quick')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Start Quick Test
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Full Practice Exam (60 questions)</h4>
                  <p className="text-sm text-gray-600 mb-4">Complete MS-721 simulation with timer</p>
                  <button 
                    onClick={() => startPracticeTest('full')}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Start Full Exam
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Custom Practice</h4>
                  <p className="text-sm text-gray-600 mb-4">Select specific modules to practice</p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                    Customize Test
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">ExamTopics</h4>
                  <p className="text-sm text-blue-800 mb-2">Real exam questions from the community</p>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                    {questions.filter(q => q.source === 'ExamTopics').length} questions
                  </span>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Lead2Pass</h4>
                  <p className="text-sm text-green-800 mb-2">Professional exam preparation materials</p>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    {questions.filter(q => q.source === 'Lead2Pass').length} questions
                  </span>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">Custom</h4>
                  <p className="text-sm text-purple-800 mb-2">Curated scenarios and practical exercises</p>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    {questions.filter(q => q.source === 'Custom').length} questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'scenarios':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-World Scenarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Enterprise Teams Phone Deployment</h4>
                  <p className="text-sm text-gray-600 mb-4">Deploy Teams Phone for 1,000+ users with Direct Routing</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Advanced</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Start Scenario →
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Teams Rooms Mass Deployment</h4>
                  <p className="text-sm text-gray-600 mb-4">Deploy 75+ Teams Rooms with centralized management</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Advanced</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Start Scenario →
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Call Quality Troubleshooting</h4>
                  <p className="text-sm text-gray-600 mb-4">Diagnose and resolve network-related call quality issues</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Intermediate</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Start Scenario →
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Emergency Calling Implementation</h4>
                  <p className="text-sm text-gray-600 mb-4">Configure emergency calling for multi-location organization</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Advanced</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Start Scenario →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Overall Progress</h3>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((modules.reduce((acc, module) => {
                    const progress = getProgressForModule(module.id);
                    const moduleQuestions = getQuestionsForModule(module.id);
                    return acc + (moduleQuestions.length > 0 ? (progress?.questions_completed || 0) / moduleQuestions.length : 0);
                  }, 0) / modules.length) * 100)}%
                </p>
                <p className="text-sm text-green-600">Certification ready</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Questions Completed</h3>
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.reduce((acc, module) => {
                    const progress = getProgressForModule(module.id);
                    return acc + (progress?.questions_completed || 0);
                  }, 0)}
                </p>
                <p className="text-sm text-blue-600">of {questions.length} total</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Average Score</h3>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((modules.reduce((acc, module) => {
                    const progress = getProgressForModule(module.id);
                    const moduleQuestions = getQuestionsForModule(module.id);
                    return acc + (moduleQuestions.length > 0 ? ((progress?.score || 0) / moduleQuestions.length) * 100 : 0);
                  }, 0) / modules.length))}%
                </p>
                <p className="text-sm text-yellow-600">Excellent performance</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Progress</h3>
              <div className="space-y-4">
                {modules.map((module) => {
                  const moduleQuestions = getQuestionsForModule(module.id);
                  const progress = getProgressForModule(module.id);
                  const progressPercentage = moduleQuestions.length > 0 
                    ? ((progress?.questions_completed || 0) / moduleQuestions.length) * 100 
                    : 0;

                  const iconMap: Record<string, any> = {
                    'Phone': Phone,
                    'Video': Video,
                    'Monitor': Monitor,
                    'Network': Network,
                    'Users': Users,
                    'BarChart3': BarChart3,
                    'Shield': Shield,
                    'Zap': Zap,
                    'Home': Home,
                    'Headphones': Headphones,
                    'Wrench': Wrench
                  };

                  const Icon = iconMap[module.icon] || BookOpen;

                  return (
                    <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg bg-${module.color}-100 mr-3`}>
                          <Icon className={`w-4 h-4 text-${module.color}-600`} />
                        </div>
                        <span className="font-medium text-gray-900">{module.title}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${module.color}-500`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-16 text-right">
                          {progress?.questions_completed || 0}/{moduleQuestions.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">MS-721 Learning Center</h2>
              </div>
              <p className="text-blue-100 mb-6">
                Master Microsoft Teams collaboration communications with interactive learning, 
                real exam scenarios, and hands-on practice in a live admin environment.
              </p>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveTab('modules')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50"
                >
                  Start Learning Path
                </button>
                <button 
                  onClick={() => setActiveTab('practice')}
                  className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600"
                >
                  Take Practice Test
                </button>
              </div>
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Study Modules</h3>
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
                <p className="text-sm text-blue-600">Interactive modules</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Practice Questions</h3>
                  <Brain className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                <p className="text-sm text-green-600">Exam-style questions</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Practical Tasks</h3>
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{practicalTasks.length}</p>
                <p className="text-sm text-purple-600">Hands-on exercises</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-sm text-yellow-600">Pass rate</p>
              </div>
            </div>

            {/* Quick Start */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Learning Path</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.slice(0, 6).map((module, index) => {
                  const iconMap: Record<string, any> = {
                    'Phone': Phone,
                    'Video': Video,
                    'Monitor': Monitor,
                    'Network': Network,
                    'Users': Users,
                    'BarChart3': BarChart3,
                    'Shield': Shield,
                    'Zap': Zap,
                    'Home': Home,
                    'Headphones': Headphones,
                    'Wrench': Wrench
                  };

                  const Icon = iconMap[module.icon] || BookOpen;

                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveTab('modules')}
                      className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-lg bg-${module.color}-100 mr-3`}>
                          <Icon className={`w-5 h-5 text-${module.color}-600`} />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Module {index + 1}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{module.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                      <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Start Module
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Interactive Admin Environment</h4>
                      <p className="text-sm text-gray-600">Practice with real Teams admin center interface</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Real Exam Questions</h4>
                      <p className="text-sm text-gray-600">Questions from ExamTopics and Lead2Pass</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Detailed Explanations</h4>
                      <p className="text-sm text-gray-600">Comprehensive explanations for every answer</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Hands-on Scenarios</h4>
                      <p className="text-sm text-gray-600">Real-world deployment and troubleshooting scenarios</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Progress Tracking</h4>
                      <p className="text-sm text-gray-600">Monitor your learning progress with database persistence</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Practice Tests</h4>
                      <p className="text-sm text-gray-600">Full-length practice exams with timing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MS-721 Learning Center</h1>
        <p className="text-gray-600">Interactive learning environment for Microsoft Teams collaboration communications certification</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default LearningCenter;