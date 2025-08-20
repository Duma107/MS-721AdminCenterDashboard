import React, { useState } from 'react';
import { 
  Video, 
  Users, 
  Calendar, 
  Settings, 
  Plus, 
  Globe,
  Mic,
  Camera,
  Share,
  Clock,
  ArrowRight,
  Radio,
  UserCheck,
  Shield,
  Zap
} from 'lucide-react';

const Meetings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const meetingStats = [
    { label: 'Monthly Meetings', value: '15,329', change: '+18%' },
    { label: 'Webinars Hosted', value: '127', change: '+25%' },
    { label: 'Town Halls', value: '8', change: '+2' },
    { label: 'Meeting Rooms', value: '45', change: '+3' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'policies', label: 'Meeting Policies' },
    { id: 'webinars', label: 'Webinars' },
    { id: 'townhalls', label: 'Town Halls' },
    { id: 'audio', label: 'Audio Conferencing' },
    { id: 'premium', label: 'Teams Premium' },
  ];

  const upcomingWebinars = [
    { title: 'Q4 Product Launch', attendees: 250, date: 'Dec 15, 2024', status: 'scheduled', type: 'public' },
    { title: 'Security Best Practices', attendees: 180, date: 'Dec 18, 2024', status: 'draft', type: 'in-org' },
    { title: 'Team Building Session', attendees: 75, date: 'Dec 20, 2024', status: 'scheduled', type: 'in-org' },
  ];

  const townHalls = [
    { title: 'All-Hands Q4 Review', attendees: 1200, date: 'Dec 20, 2024', status: 'scheduled', eCDN: true },
    { title: 'New Year Strategy', attendees: 850, date: 'Jan 5, 2025', status: 'draft', eCDN: true },
  ];

  const meetingTemplates = [
    { name: 'Executive Meeting', features: ['Recording', 'Transcription', 'Copilot'], users: 45 },
    { name: 'Team Standup', features: ['Quick Join', 'Basic Features'], users: 892 },
    { name: 'Client Presentation', features: ['External Sharing', 'Watermark'], users: 156 },
    { name: 'Training Session', features: ['Breakout Rooms', 'Q&A', 'Polls'], users: 234 },
  ];

  const premiumFeatures = [
    { name: 'Microsoft 365 Copilot', description: 'AI-powered meeting insights and summaries', enabled: true },
    { name: 'Advanced Meeting Protection', description: 'Watermarks and sensitivity labels', enabled: true },
    { name: 'Virtual Appointments', description: 'Branded meeting experiences', enabled: false },
    { name: 'Intelligent Recap', description: 'AI-generated meeting summaries', enabled: true },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'policies':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Meeting Policies</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Policy
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Standard Meeting Policy</h4>
                  <p className="text-sm text-gray-600 mb-3">Default settings for regular meetings</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max participants:</span>
                      <span className="font-medium">300</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recording:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">External sharing:</span>
                      <span className="font-medium text-yellow-600">Restricted</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transcription:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Executive Meeting Policy</h4>
                  <p className="text-sm text-gray-600 mb-3">Enhanced settings for leadership</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max participants:</span>
                      <span className="font-medium">1000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recording:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">External sharing:</span>
                      <span className="font-medium text-green-600">Allowed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Copilot:</span>
                      <span className="font-medium text-blue-600">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Templates</h3>
              <div className="space-y-4">
                {meetingTemplates.map((template, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <span className="text-sm text-gray-600">{template.users} users</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, fIndex) => (
                        <span key={fIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'webinars':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Webinar Management</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Webinar
                </button>
              </div>
              <div className="space-y-4">
                {upcomingWebinars.map((webinar, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{webinar.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {webinar.attendees} registered
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {webinar.date}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            webinar.type === 'public' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {webinar.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          webinar.status === 'scheduled' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {webinar.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Webinar Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <UserCheck className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Registration Management</h4>
                  <p className="text-sm text-gray-600">Control attendee registration and approval</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Share className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Attendee Interaction</h4>
                  <p className="text-sm text-gray-600">Q&A, polls, and chat moderation</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Public/Private Settings</h4>
                  <p className="text-sm text-gray-600">Configure access and visibility</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'townhalls':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Town Hall Events</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
                  <Radio className="w-4 h-4 mr-2" />
                  Schedule Town Hall
                </button>
              </div>
              <div className="space-y-4">
                {townHalls.map((event, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-purple-50 to-white">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.attendees} expected
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date}
                          </span>
                          {event.eCDN && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              eCDN Enabled
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'scheduled' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Town Hall Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">eCDN Configuration</h4>
                    <p className="text-sm text-blue-800 mb-3">Optimize video delivery for large audiences</p>
                    <button className="text-blue-700 text-sm font-medium hover:text-blue-800">
                      Configure eCDN →
                    </button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Integration Settings</h4>
                    <p className="text-sm text-green-800 mb-3">Connect with Viva Engage and Stream</p>
                    <button className="text-green-700 text-sm font-medium hover:text-green-800">
                      Manage Integrations →
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Attendee Experience</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Interactive Q&A sessions</li>
                      <li>• Real-time polls and reactions</li>
                      <li>• Multi-language captions</li>
                      <li>• Mobile-optimized viewing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Conferencing Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Default Conference Bridge</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primary Number:</span>
                      <span className="font-medium">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Toll-Free:</span>
                      <span className="font-medium">+1 (800) 555-0123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conference ID:</span>
                      <span className="font-medium">Auto-generated</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Bridge Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entry/Exit Announcements:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PIN Required:</span>
                      <span className="font-medium text-yellow-600">Optional</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auto-recording:</span>
                      <span className="font-medium text-red-600">Disabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'premium':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Teams Premium Features</h3>
              <div className="space-y-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feature.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Microsoft 365 Copilot Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-2">Meeting Summaries</h4>
                  <p className="text-sm text-gray-600 mb-3">AI-generated recaps and action items</p>
                  <div className="text-xs text-blue-600">1,247 summaries generated this month</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">Intelligent Insights</h4>
                  <p className="text-sm text-gray-600 mb-3">Real-time meeting analytics and suggestions</p>
                  <div className="text-xs text-green-600">Active in 89% of executive meetings</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meetingStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Meeting Features */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Meeting Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <Video className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Meeting Templates</h4>
                  <p className="text-sm text-gray-600">Create reusable meeting configurations</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                  <Radio className="w-6 h-6 text-purple-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Town Hall Setup</h4>
                  <p className="text-sm text-gray-600">Configure large-scale broadcasting</p>
                  <ArrowRight className="w-4 h-4 text-purple-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group">
                  <Globe className="w-6 h-6 text-green-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Webinar Settings</h4>
                  <p className="text-sm text-gray-600">Configure webinar policies and features</p>
                  <ArrowRight className="w-4 h-4 text-green-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors group">
                  <Zap className="w-6 h-6 text-yellow-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Teams Premium</h4>
                  <p className="text-sm text-gray-600">Advanced AI-powered features</p>
                  <ArrowRight className="w-4 h-4 text-yellow-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <Mic className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Audio Conferencing</h4>
                  <p className="text-sm text-gray-600">Manage PSTN dial-in numbers</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">
                  <Shield className="w-6 h-6 text-indigo-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Meeting Security</h4>
                  <p className="text-sm text-gray-600">Watermarks and access controls</p>
                  <ArrowRight className="w-4 h-4 text-indigo-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Meeting Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Usage Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average meeting duration</span>
                    <span className="font-semibold text-gray-900">42 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Peak usage hours</span>
                    <span className="font-semibold text-gray-900">10 AM - 2 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">External participants</span>
                    <span className="font-semibold text-gray-900">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Recording usage</span>
                    <span className="font-semibold text-gray-900">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Copilot usage</span>
                    <span className="font-semibold text-blue-600">34%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Camera className="w-5 h-5 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Meeting policy updated</p>
                      <p className="text-sm text-gray-600">External sharing restrictions applied</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Share className="w-5 h-5 text-green-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Webinar scheduled</p>
                      <p className="text-sm text-gray-600">Q4 Product Launch - 250 attendees</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Radio className="w-5 h-5 text-purple-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Town hall completed</p>
                      <p className="text-sm text-gray-600">All-hands meeting with 1,200 attendees</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Copilot enabled</p>
                      <p className="text-sm text-gray-600">AI features activated for executive team</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meetings & Events</h1>
        <p className="text-gray-600">Manage Teams meetings, webinars, town halls, and audio conferencing</p>
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

export default Meetings;