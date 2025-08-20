import React, { useState } from 'react';
import { 
  Users as UsersIcon, 
  Plus, 
  Search, 
  Filter, 
  Phone,
  Video,
  Shield,
  Settings,
  Mail,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const userStats = [
    { label: 'Total Users', value: '4,892', change: '+127' },
    { label: 'Phone Licensed', value: '2,847', change: '+89' },
    { label: 'Meeting Licensed', value: '4,650', change: '+98' },
    { label: 'Policy Assignments', value: '1,247', change: '+23' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'licenses', label: 'License Management' },
    { id: 'policies', label: 'Policy Assignment' },
    { id: 'bulk', label: 'Bulk Operations' },
  ];

  const users = [
    { 
      name: 'John Doe', 
      email: 'john.doe@company.com', 
      phone: '+1 (555) 123-4567',
      phoneEnabled: true,
      meetingEnabled: true,
      policies: ['Standard Calling', 'Standard Meeting'],
      status: 'active'
    },
    { 
      name: 'Jane Smith', 
      email: 'jane.smith@company.com', 
      phone: '+1 (555) 123-4568',
      phoneEnabled: true,
      meetingEnabled: true,
      policies: ['Executive Calling', 'Executive Meeting'],
      status: 'active'
    },
    { 
      name: 'Mike Johnson', 
      email: 'mike.johnson@company.com', 
      phone: 'Not assigned',
      phoneEnabled: false,
      meetingEnabled: true,
      policies: ['Standard Meeting'],
      status: 'pending'
    },
  ];

  const policies = [
    { name: 'Standard Calling Policy', type: 'Calling', users: 2341, description: 'Default calling permissions' },
    { name: 'Executive Calling Policy', type: 'Calling', users: 45, description: 'Enhanced calling features' },
    { name: 'Standard Meeting Policy', type: 'Meeting', users: 4650, description: 'Default meeting settings' },
    { name: 'Executive Meeting Policy', type: 'Meeting', users: 142, description: 'Premium meeting features' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'licenses':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">License Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-900">Teams Phone Standard</h4>
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-900">2,847</p>
                  <p className="text-sm text-blue-600">of 3,000 licenses used</p>
                  <div className="mt-2 bg-blue-200 rounded-full h-2">
                    <div className="h-2 bg-blue-600 rounded-full" style={{ width: '94.9%' }} />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-900">Teams Premium</h4>
                    <Video className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-900">1,243</p>
                  <p className="text-sm text-green-600">of 1,500 licenses used</p>
                  <div className="mt-2 bg-green-200 rounded-full h-2">
                    <div className="h-2 bg-green-600 rounded-full" style={{ width: '82.9%' }} />
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-purple-900">Audio Conferencing</h4>
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-900">892</p>
                  <p className="text-sm text-purple-600">of 1,000 licenses used</p>
                  <div className="mt-2 bg-purple-200 rounded-full h-2">
                    <div className="h-2 bg-purple-600 rounded-full" style={{ width: '89.2%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'policies':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Policy Templates</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Policy
                </button>
              </div>
              <div className="space-y-4">
                {policies.map((policy, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-medium text-gray-900 mr-3">{policy.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            policy.type === 'Calling' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {policy.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                        <p className="text-sm text-gray-500">{policy.users} users assigned</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'bulk':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Operations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Import Users</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload CSV file to create multiple users</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                    Upload CSV File
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Bulk License Assignment</h4>
                  <p className="text-sm text-gray-600 mb-4">Assign licenses to multiple users at once</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    Assign Licenses
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Policy Assignment</h4>
                  <p className="text-sm text-gray-600 mb-4">Apply policies to groups of users</p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                    Assign Policies
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Phone Number Port</h4>
                  <p className="text-sm text-gray-600 mb-4">Port existing numbers in bulk</p>
                  <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700">
                    Port Numbers
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* User Management */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Phone Number</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Services</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Policies</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-blue-600">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-mono">{user.phone}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            {user.phoneEnabled ? (
                              <Phone className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Phone className="w-4 h-4 text-gray-300" />
                            )}
                            {user.meetingEnabled ? (
                              <Video className="w-4 h-4 text-green-600" />
                            ) : (
                              <Video className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {user.policies.map((policy, pIndex) => (
                              <span key={pIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {policy}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status === 'active' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertCircle className="w-3 h-3 mr-1" />
                            )}
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Users & Policies</h1>
        <p className="text-gray-600">Manage user accounts, licenses, and policy assignments</p>
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

export default Users;