import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Phone,
  Video,
  Users,
  Clock,
  Download,
  Filter,
  Calendar,
  Signal,
  Globe,
  ArrowRight
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('7d');

  const tabs = [
    { id: 'dashboard', label: 'Call Quality Dashboard' },
    { id: 'reports', label: 'Reports & Analytics' },
    { id: 'health', label: 'Service Health' },
    { id: 'usage', label: 'Usage Analytics' },
  ];

  const qualityMetrics = [
    { label: 'Call Success Rate', value: '98.7%', trend: '+0.3%', status: 'excellent' },
    { label: 'Average Call Duration', value: '12m 34s', trend: '+2.1%', status: 'good' },
    { label: 'Poor Call Quality', value: '1.2%', trend: '-0.5%', status: 'excellent' },
    { label: 'Media Failures', value: '0.08%', trend: '-0.02%', status: 'excellent' },
  ];

  const callVolumeData = [
    { hour: '00:00', calls: 45 },
    { hour: '02:00', calls: 23 },
    { hour: '04:00', calls: 12 },
    { hour: '06:00', calls: 89 },
    { hour: '08:00', calls: 234 },
    { hour: '10:00', calls: 567 },
    { hour: '12:00', calls: 432 },
    { hour: '14:00', calls: 678 },
    { hour: '16:00', calls: 543 },
    { hour: '18:00', calls: 321 },
    { hour: '20:00', calls: 156 },
    { hour: '22:00', calls: 87 },
  ];

  const topIssues = [
    { issue: 'Network Jitter > 30ms', count: 23, severity: 'medium' },
    { issue: 'Packet Loss > 1%', count: 12, severity: 'high' },
    { issue: 'Round Trip Time > 200ms', count: 8, severity: 'medium' },
    { issue: 'Audio Device Issues', count: 5, severity: 'low' },
  ];

  const usageStats = [
    { metric: 'Total Calls Today', value: '2,847', change: '+12%' },
    { metric: 'Meeting Minutes', value: '45,230', change: '+18%' },
    { metric: 'Active Users', value: '4,892', change: '+5%' },
    { metric: 'PSTN Minutes', value: '12,456', change: '+8%' },
  ];

  const reports = [
    { name: 'Monthly Call Quality Report', type: 'Scheduled', lastRun: '2024-12-01', status: 'completed' },
    { name: 'PSTN Usage Report', type: 'On-demand', lastRun: '2024-12-15', status: 'completed' },
    { name: 'Teams Phone Analytics', type: 'Weekly', lastRun: '2024-12-14', status: 'running' },
    { name: 'Meeting Usage Summary', type: 'Monthly', lastRun: '2024-12-01', status: 'completed' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </button>
              </div>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span>{report.type}</span>
                          <span>Last run: {report.lastRun}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'completed' ? 'bg-green-100 text-green-800' :
                          report.status === 'running' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {report.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'health':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Teams Phone Service</h3>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Service Health: Operational</p>
                <p className="text-xs text-gray-500">Last incident: 3 days ago</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Meeting Services</h3>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Service Health: Operational</p>
                <p className="text-xs text-gray-500">Uptime: 99.98%</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Direct Routing</h3>
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Service Health: Degraded</p>
                <p className="text-xs text-gray-500">SBC connectivity issues</p>
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {usageStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.metric}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Peak calling hours: 10 AM - 2 PM</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Video className="w-5 h-5 text-green-600 mr-3" />
                    <span className="font-medium text-gray-900">Meeting usage up 18% this month</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium text-gray-900">Daily active users: 4,892</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Quality Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                    {metric.status === 'excellent' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Signal className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <span className={`text-xs font-medium ${
                    metric.trend.startsWith('+') && metric.label !== 'Poor Call Quality' && metric.label !== 'Media Failures' 
                      ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              ))}
            </div>

            {/* Call Volume Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Call Volume (24h)</h3>
                <div className="flex items-center space-x-2">
                  <select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end space-x-2 h-32">
                {callVolumeData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.calls / Math.max(...callVolumeData.map(d => d.calls))) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-1">{data.hour.split(':')[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Quality Issues</h3>
                <div className="space-y-3">
                  {topIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{issue.issue}</p>
                        <p className="text-sm text-gray-600">{issue.count} occurrences</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                        issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {issue.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Generate Quality Report</p>
                        <p className="text-sm text-gray-600">Export detailed call quality metrics</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Network Assessment</p>
                        <p className="text-sm text-gray-600">Run Teams network readiness test</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Create Alert Rule</p>
                        <p className="text-sm text-gray-600">Set up proactive monitoring alerts</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reporting</h1>
        <p className="text-gray-600">Monitor call quality, usage patterns, and system health</p>
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

export default Analytics;