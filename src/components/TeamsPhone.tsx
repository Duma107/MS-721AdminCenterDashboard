import React, { useState } from 'react';
import { 
  Phone, 
  Plus, 
  Settings, 
  Users, 
  Globe, 
  Shield,
  PhoneCall,
  Headphones,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Lightbulb,
  ChevronRight,
  X
} from 'lucide-react';

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
  currentStep: number;
  hints: string[];
}

const TeamsPhone: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activePractical, setActivePractical] = useState<ActivePractical | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);

  const phoneStats = [
    { label: 'Licensed Users', value: '2,847', change: '+12%' },
    { label: 'Phone Numbers', value: '3,156', change: '+5%' },
    { label: 'Auto Attendants', value: '24', change: '+2' },
    { label: 'Call Queues', value: '18', change: '+1' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'policies', label: 'Policies' },
    { id: 'numbers', label: 'Phone Numbers' },
    { id: 'routing', label: 'Direct Routing' },
    { id: 'emergency', label: 'Emergency Calling' },
  ];

  const practicalExercises = [
    {
      id: 'assign-phone-license',
      title: 'Assign Teams Phone License',
      description: 'Learn to assign Teams Phone licenses to users and configure basic settings',
      difficulty: 'Beginner',
      estimatedTime: '10 min'
    },
    {
      id: 'configure-auto-attendant',
      title: 'Configure Auto Attendant',
      description: 'Set up a complete auto attendant with business hours and call routing',
      difficulty: 'Intermediate',
      estimatedTime: '25 min'
    },
    {
      id: 'setup-direct-routing',
      title: 'Setup Direct Routing',
      description: 'Configure Direct Routing with SBC connectivity and voice routes',
      difficulty: 'Advanced',
      estimatedTime: '45 min'
    }
  ];

  const startPractical = (practicalId: string) => {
    let practicalData: ActivePractical;

    switch (practicalId) {
      case 'assign-phone-license':
        practicalData = {
          id: practicalId,
          title: 'Assign Teams Phone License',
          description: 'This practical will guide you through assigning Teams Phone licenses to users and configuring basic phone settings.',
          currentStep: 0,
          steps: [
            {
              step: 1,
              action: 'Navigate to Users section',
              description: 'Go to Users & Policies in the admin center navigation'
            },
            {
              step: 2,
              action: 'Select a user',
              description: 'Choose a user who needs Teams Phone functionality'
            },
            {
              step: 3,
              action: 'Assign Teams Phone license',
              description: 'Add Teams Phone Standard license to the user account'
            },
            {
              step: 4,
              action: 'Assign phone number',
              description: 'Assign an available phone number from your inventory'
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
            'Ensure the user has a valid Teams license before adding Phone license',
            'Check phone number availability in your region',
            'Consider the user\'s role when selecting calling policies',
            'Test both inbound and outbound calling functionality'
          ]
        };
        break;

      case 'configure-auto-attendant':
        practicalData = {
          id: practicalId,
          title: 'Configure Auto Attendant',
          description: 'Set up a comprehensive auto attendant with business hours, menu options, and call routing.',
          currentStep: 0,
          steps: [
            {
              step: 1,
              action: 'Create resource account',
              description: 'Create a new resource account for the auto attendant'
            },
            {
              step: 2,
              action: 'Assign license to resource account',
              description: 'Add Teams Phone Standard license to the resource account'
            },
            {
              step: 3,
              action: 'Assign phone number',
              description: 'Assign the main reception number to the resource account'
            },
            {
              step: 4,
              action: 'Create auto attendant',
              description: 'Set up the auto attendant with basic configuration'
            },
            {
              step: 5,
              action: 'Configure business hours',
              description: 'Set up business hours and after-hours handling'
            },
            {
              step: 6,
              action: 'Add menu options',
              description: 'Configure menu options for different departments'
            },
            {
              step: 7,
              action: 'Set up holiday schedule',
              description: 'Configure special handling for holidays'
            },
            {
              step: 8,
              action: 'Test all call flows',
              description: 'Verify all routing options work correctly'
            }
          ],
          hints: [
            'Resource accounts need proper licensing to function',
            'Test during and after business hours',
            'Consider creating call queues for departments',
            'Use clear and professional greetings'
          ]
        };
        break;

      case 'setup-direct-routing':
        practicalData = {
          id: practicalId,
          title: 'Setup Direct Routing',
          description: 'Configure Direct Routing to connect Teams Phone with your existing telephony infrastructure.',
          currentStep: 0,
          steps: [
            {
              step: 1,
              action: 'Prepare SBC configuration',
              description: 'Ensure your Session Border Controller is properly configured'
            },
            {
              step: 2,
              action: 'Add SBC to Teams',
              description: 'Register your SBC FQDN in the Teams admin center'
            },
            {
              step: 3,
              action: 'Create PSTN usage records',
              description: 'Define usage patterns for different call types'
            },
            {
              step: 4,
              action: 'Configure voice routes',
              description: 'Set up routing patterns for local and international calls'
            },
            {
              step: 5,
              action: 'Create voice routing policies',
              description: 'Define policies that determine which routes users can access'
            },
            {
              step: 6,
              action: 'Assign policies to users',
              description: 'Apply voice routing policies to appropriate users'
            },
            {
              step: 7,
              action: 'Test connectivity',
              description: 'Verify SBC connectivity and call routing'
            },
            {
              step: 8,
              action: 'Monitor call quality',
              description: 'Use Call Quality Dashboard to monitor performance'
            }
          ],
          hints: [
            'Ensure SBC certificates are valid and trusted',
            'Test with a small group of users first',
            'Configure trunk translation rules if needed',
            'Monitor call quality metrics regularly'
          ]
        };
        break;

      default:
        return;
    }

    setActivePractical(practicalData);
    setCompletedSteps([]);
    setShowHints(false);
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

  const renderContent = () => {
    switch (activeTab) {
      case 'policies':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Calling Policies</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Policy
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Standard Calling Policy</h4>
                  <p className="text-sm text-gray-600 mb-3">Default policy for internal users</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">International calling:</span>
                      <span className="font-medium text-red-600">Disabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Call forwarding:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Simultaneous ring:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-green-600 font-medium">2,341 users assigned</span>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Executive Calling Policy</h4>
                  <p className="text-sm text-gray-600 mb-3">Enhanced policy for executives</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">International calling:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Call forwarding:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Private line:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-green-600 font-medium">45 users assigned</span>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Practice: Create Custom Calling Policy</h3>
              <p className="text-blue-800 mb-4">Learn to create and configure calling policies for different user groups in your organization.</p>
              <button 
                onClick={() => startPractical('configure-calling-policy')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Start Practical Exercise
              </button>
            </div>
          </div>
        );
      
      case 'numbers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Phone Number Inventory</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Numbers
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Number</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Assignment</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">+1 (555) 123-4567</td>
                      <td className="py-3 px-4 text-sm">User</td>
                      <td className="py-3 px-4 text-sm">john.doe@company.com</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">+1 (555) 123-4568</td>
                      <td className="py-3 px-4 text-sm">Service</td>
                      <td className="py-3 px-4 text-sm">Main Reception</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">+1 (555) 123-4569</td>
                      <td className="py-3 px-4 text-sm">User</td>
                      <td className="py-3 px-4 text-sm">Unassigned</td>
                      <td className="py-3 px-4">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Available</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Practice: Assign Phone Numbers</h3>
              <p className="text-green-800 mb-4">Learn to assign phone numbers to users and configure number settings.</p>
              <button 
                onClick={() => startPractical('assign-phone-numbers')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Start Practical Exercise
              </button>
            </div>
          </div>
        );

      case 'routing':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Direct Routing Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Session Border Controllers</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primary SBC:</span>
                      <span className="font-medium">sbc1.company.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-green-600">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last seen:</span>
                      <span className="font-medium">2 minutes ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Voice Routes</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Local calls:</span>
                      <span className="font-medium text-green-600">Configured</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">International:</span>
                      <span className="font-medium text-green-600">Configured</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency:</span>
                      <span className="font-medium text-green-600">Configured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Practice: Configure Direct Routing</h3>
              <p className="text-purple-800 mb-4">Learn to set up Direct Routing with SBC connectivity and voice routes.</p>
              <button 
                onClick={() => startPractical('setup-direct-routing')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
              >
                <Globe className="w-4 h-4 mr-2" />
                Start Practical Exercise
              </button>
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Calling Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Emergency Locations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seattle Office:</span>
                      <span className="font-medium text-green-600">Validated</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">New York Office:</span>
                      <span className="font-medium text-green-600">Validated</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">London Office:</span>
                      <span className="font-medium text-yellow-600">Pending</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">LIS Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trusted IPs:</span>
                      <span className="font-medium">24 configured</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subnets:</span>
                      <span className="font-medium">12 configured</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auto-detection:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Practice: Configure Emergency Calling</h3>
              <p className="text-red-800 mb-4">Learn to set up emergency calling with location validation and LIS configuration.</p>
              <button 
                onClick={() => startPractical('configure-emergency-calling')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
              >
                <Shield className="w-4 h-4 mr-2" />
                Start Practical Exercise
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phoneStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Practical Exercises */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                Teams Phone Practical Exercises
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {practicalExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => startPractical(exercise.id)}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {exercise.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {exercise.estimatedTime}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{exercise.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Start Exercise
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button 
                  onClick={() => startPractical('assign-phone-license')}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <Phone className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Assign Phone License</h4>
                  <p className="text-sm text-gray-600">Enable Teams Phone for users</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => startPractical('configure-auto-attendant')}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <Headphones className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Create Auto Attendant</h4>
                  <p className="text-sm text-gray-600">Set up automated call handling</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => startPractical('setup-direct-routing')}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <Globe className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Configure Direct Routing</h4>
                  <p className="text-sm text-gray-600">Connect to your SBC</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Recent Configuration */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Phone Configurations</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <PhoneCall className="w-5 h-5 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Emergency calling policy updated</p>
                    <p className="text-sm text-gray-600">Applied to 145 users in Seattle office</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <Settings className="w-5 h-5 text-green-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New auto attendant deployed</p>
                    <p className="text-sm text-gray-600">Main reception auto attendant is now live</p>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">SBC connectivity issue resolved</p>
                    <p className="text-sm text-gray-600">Direct routing is back to normal operation</p>
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-8 relative">
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
                    <h4 className="font-medium text-gray-900 mb-2">Related Sections</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      This practical involves Teams Phone configuration.
                    </p>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 bg-white border border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-900">Phone Policies</span>
                          <ChevronRight className="w-4 h-4 text-blue-600" />
                        </div>
                      </button>
                      <button className="w-full text-left p-2 bg-white border border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-900">Phone Numbers</span>
                          <ChevronRight className="w-4 h-4 text-blue-600" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teams Phone Management</h1>
        <p className="text-gray-600">Configure and manage Teams Phone services, policies, and routing with hands-on learning</p>
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

export default TeamsPhone;