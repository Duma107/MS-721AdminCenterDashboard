import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Video, 
  Monitor, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  TrendingUp,
  Clock,
  Globe,
  BookOpen,
  Target,
  Play,
  ArrowRight,
  Lightbulb,
  ChevronRight,
  X
} from 'lucide-react';
import { useLearningData } from '../hooks/useLearningData';
import { supabase } from '../lib/supabase';

interface PracticalStep {
  step: number;
  action: string;
  description: string;
  completed?: boolean;
}

interface ActivePractical {
  id: string;
  title: string;
  description: string;
  steps: PracticalStep[];
  component: string;
  currentStep: number;
  hints: string[];
}

const Dashboard: React.FC = () => {
  const { modules, questions, getProgressForModule, loading } = useLearningData();
  const [activePractical, setActivePractical] = useState<ActivePractical | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const stats = [
    { label: 'Active Phone Users', value: '2,847', icon: Phone, color: 'bg-blue-500', trend: '+12%' },
    { label: 'Monthly Meetings', value: '15,329', icon: Video, color: 'bg-green-500', trend: '+18%' },
    { label: 'Teams Rooms', value: '127', icon: Monitor, color: 'bg-purple-500', trend: '+8' },
    { label: 'Licensed Users', value: '4,892', icon: Users, color: 'bg-orange-500', trend: '+127' },
  ];

  const alerts = [
    { type: 'warning', message: 'Direct Routing SBC connectivity issue detected', time: '5 minutes ago', practical: 'troubleshoot-sbc' },
    { type: 'info', message: '3 Teams Rooms require firmware updates', time: '1 hour ago', practical: 'update-rooms' },
    { type: 'success', message: 'Emergency calling policies successfully deployed', time: '2 hours ago', practical: null },
  ];

  const recentActivity = [
    { action: 'Auto attendant configured', user: 'IT Admin', time: '10 minutes ago', practical: 'configure-auto-attendant' },
    { action: 'Call queue policy updated', user: 'Teams Admin', time: '25 minutes ago', practical: 'manage-call-queues' },
    { action: 'Emergency location added', user: 'Security Admin', time: '1 hour ago', practical: 'setup-emergency-calling' },
    { action: 'Phone number ported', user: 'Telecom Admin', time: '2 hours ago', practical: 'port-phone-numbers' },
  ];

  const quickPracticals = [
    {
      id: 'teams-phone-setup',
      title: 'Configure Teams Phone for New User',
      description: 'Learn to assign licenses and configure phone settings',
      component: 'phone',
      estimatedTime: '15 min',
      difficulty: 'Beginner',
      icon: Phone,
      color: 'blue'
    },
    {
      id: 'meeting-policy-creation',
      title: 'Create Custom Meeting Policy',
      description: 'Set up meeting policies with specific restrictions',
      component: 'meetings',
      estimatedTime: '20 min',
      difficulty: 'Intermediate',
      icon: Video,
      color: 'green'
    },
    {
      id: 'teams-room-deployment',
      title: 'Deploy Teams Room Device',
      description: 'Configure and deploy a new Teams Room',
      component: 'rooms',
      estimatedTime: '30 min',
      difficulty: 'Advanced',
      icon: Monitor,
      color: 'purple'
    }
  ];

  const learningProgress = modules.map(module => {
    const progress = getProgressForModule(module.id);
    const moduleQuestions = questions.filter(q => q.module_id === module.id);
    const completionRate = moduleQuestions.length > 0 
      ? ((progress?.questions_completed || 0) / moduleQuestions.length) * 100 
      : 0;
    
    return {
      ...module,
      completionRate,
      questionsCompleted: progress?.questions_completed || 0,
      totalQuestions: moduleQuestions.length,
      lastAccessed: progress?.last_accessed
    };
  });

  const startPractical = async (practicalId: string) => {
    // Simulate loading practical data
    const practicalData: ActivePractical = {
      id: practicalId,
      title: 'Configure Teams Phone for New User',
      description: 'This practical will guide you through the process of setting up Teams Phone for a new user, including license assignment and policy configuration.',
      component: 'phone',
      currentStep: 0,
      steps: [
        {
          step: 1,
          action: 'Navigate to Users section',
          description: 'Go to the Users & Policies section in the admin center'
        },
        {
          step: 2,
          action: 'Select target user',
          description: 'Find and select the user who needs Teams Phone configuration'
        },
        {
          step: 3,
          action: 'Assign Teams Phone license',
          description: 'Add Teams Phone Standard license to the user account'
        },
        {
          step: 4,
          action: 'Assign phone number',
          description: 'Assign an available phone number to the user'
        },
        {
          step: 5,
          action: 'Configure calling policies',
          description: 'Apply appropriate calling policies based on user role'
        },
        {
          step: 6,
          action: 'Test configuration',
          description: 'Verify the user can make and receive calls'
        }
      ],
      hints: [
        'Make sure the user has a valid Teams license before adding Phone license',
        'Check phone number availability in your region',
        'Consider the user\'s role when selecting calling policies',
        'Test both inbound and outbound calling functionality'
      ]
    };

    setActivePractical(practicalData);
    setCompletedSteps([]);
    setShowHints(false);

    // Log activity to database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('dashboard_activities').insert({
          user_id: user.id,
          activity_type: 'practical_started',
          component: 'dashboard',
          description: `Started practical: ${practicalData.title}`,
          status: 'in_progress',
          metadata: { practical_id: practicalId }
        });
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const completeStep = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    
    if (activePractical && stepNumber < activePractical.steps.length) {
      setActivePractical({
        ...activePractical,
        currentStep: stepNumber
      });
    }
  };

  const closePractical = () => {
    setActivePractical(null);
    setCompletedSteps([]);
    setShowHints(false);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MS-721 Admin Center Dashboard</h1>
        <p className="text-gray-600">Monitor, learn, and practice Microsoft Teams collaboration communications</p>
      </div>

      {/* Active Practical Overlay */}
      {activePractical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                        key={step.step}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          completedSteps.includes(step.step)
                            ? 'border-green-500 bg-green-50'
                            : activePractical.currentStep === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                            completedSteps.includes(step.step)
                              ? 'bg-green-500 text-white'
                              : activePractical.currentStep === index
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {completedSteps.includes(step.step) ? '✓' : step.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{step.action}</h4>
                            <p className="text-sm text-gray-600">{step.description}</p>
                            {activePractical.currentStep === index && !completedSteps.includes(step.step) && (
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

                  {/* Component Navigation */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Navigate to Component</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      This practical requires working in the {activePractical.component} section.
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                      Go to {activePractical.component.charAt(0).toUpperCase() + activePractical.component.slice(1)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Practicals */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Play className="w-5 h-5 mr-2 text-blue-600" />
            Quick Practical Exercises
          </h3>
          <span className="text-sm text-gray-500">Hands-on learning</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickPracticals.map((practical) => {
            const Icon = practical.icon;
            return (
              <button
                key={practical.id}
                onClick={() => startPractical(practical.id)}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg bg-${practical.color}-100 mr-3`}>
                    <Icon className={`w-5 h-5 text-${practical.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs px-2 py-1 rounded-full bg-${practical.color}-100 text-${practical.color}-800`}>
                      {practical.difficulty}
                    </span>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{practical.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{practical.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {practical.estimatedTime}
                  </span>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            MS-721 Learning Progress
          </h3>
          <span className="text-sm text-gray-500">Certification preparation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningProgress.slice(0, 6).map((module) => (
            <div key={module.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm">{module.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  module.completionRate === 100 ? 'bg-green-100 text-green-800' :
                  module.completionRate > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {Math.round(module.completionRate)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${module.completionRate}%` }}
                />
              </div>
              <p className="text-xs text-gray-600">
                {module.questionsCompleted}/{module.totalQuestions} questions completed
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* System Health */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            System Health & Learning Alerts
          </h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50' :
                alert.type === 'info' ? 'bg-blue-50' : 'bg-green-50'
              }`}>
                <div className="flex items-center">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                  ) : alert.type === 'info' ? (
                    <Activity className="w-5 h-5 text-blue-600 mr-3" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  )}
                  <div className="flex-1">
                    <span className={`font-medium ${
                      alert.type === 'warning' ? 'text-yellow-800' :
                      alert.type === 'info' ? 'text-blue-800' : 'text-green-800'
                    }`}>
                      {alert.message}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {alert.time}
                    </p>
                  </div>
                </div>
                {alert.practical && (
                  <button
                    onClick={() => startPractical(alert.practical)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Practice Fix
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activity & Practice Opportunities
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">by {activity.user} • {activity.time}</p>
                  {activity.practical && (
                    <button
                      onClick={() => startPractical(activity.practical)}
                      className="text-xs text-blue-600 hover:text-blue-700 mt-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Practice this task
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Quick Actions & Learning Paths
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Phone className="w-5 h-5 text-blue-600 mb-2" />
            <p className="font-medium text-sm">Assign Phone Numbers</p>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Video className="w-5 h-5 text-blue-600 mb-2" />
            <p className="font-medium text-sm">Create Meeting Policy</p>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Monitor className="w-5 h-5 text-blue-600 mb-2" />
            <p className="font-medium text-sm">Deploy Teams Room</p>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Globe className="w-5 h-5 text-blue-600 mb-2" />
            <p className="font-medium text-sm">Configure Emergency</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;