import React, { useState } from 'react';
import { 
  Network as NetworkIcon, 
  Gauge, 
  Signal, 
  Globe, 
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Network: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const networkStats = [
    { label: 'Network Quality', value: '98.5%', status: 'excellent' },
    { label: 'Bandwidth Usage', value: '245 Mbps', status: 'normal' },
    { label: 'Packet Loss', value: '0.12%', status: 'good' },
    { label: 'Latency', value: '18ms', status: 'excellent' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'qos', label: 'Quality of Service' },
    { id: 'assessment', label: 'Network Assessment' },
    { id: 'policies', label: 'Network Policies' },
  ];

  const qosMetrics = [
    { service: 'Teams Audio', priority: 'High', bandwidth: '65 kbps', dscp: 'EF (46)', status: 'configured' },
    { service: 'Teams Video', priority: 'Medium', bandwidth: '1.5 Mbps', dscp: 'AF41 (34)', status: 'configured' },
    { service: 'Teams Sharing', priority: 'Medium', bandwidth: '2.5 Mbps', dscp: 'AF21 (18)', status: 'configured' },
    { service: 'Signaling', priority: 'High', bandwidth: '20 kbps', dscp: 'CS3 (24)', status: 'configured' },
  ];

  const locations = [
    { name: 'Seattle HQ', users: 1250, quality: 'excellent', bandwidth: '1 Gbps' },
    { name: 'New York Office', users: 850, quality: 'good', bandwidth: '500 Mbps' },
    { name: 'London Office', users: 420, quality: 'fair', bandwidth: '200 Mbps' },
    { name: 'Singapore Office', users: 380, quality: 'excellent', bandwidth: '300 Mbps' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'qos':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality of Service Configuration</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Bandwidth</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">DSCP Marking</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qosMetrics.map((metric, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{metric.service}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            metric.priority === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {metric.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{metric.bandwidth}</td>
                        <td className="py-3 px-4 text-sm font-mono text-gray-600">{metric.dscp}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {metric.status}
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
      case 'assessment':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Assessment Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {locations.map((location, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{location.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Users:</span>
                        <span className="font-medium">{location.users}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bandwidth:</span>
                        <span className="font-medium">{location.bandwidth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quality:</span>
                        <span className={`font-medium ${
                          location.quality === 'excellent' ? 'text-green-600' :
                          location.quality === 'good' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {location.quality}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Gauge className="w-4 h-4 mr-2" />
                Run New Assessment
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {networkStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                    {stat.status === 'excellent' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : stat.status === 'good' ? (
                      <Signal className="w-5 h-5 text-blue-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Network Tools */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Management Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <Gauge className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Network Assessment Tool</h4>
                  <p className="text-sm text-gray-600">Evaluate network readiness for Teams</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <Shield className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">QoS Configuration</h4>
                  <p className="text-sm text-gray-600">Configure Quality of Service policies</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <Globe className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Network Planner</h4>
                  <p className="text-sm text-gray-600">Plan bandwidth requirements</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Network Topology */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Topology</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Internet Gateway</p>
                      <p className="text-sm text-gray-600">Direct connection to Microsoft 365</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <NetworkIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Internal Network</p>
                      <p className="text-sm text-gray-600">4 VLANs configured for Teams traffic</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Zap className="w-5 h-5 text-purple-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">ExpressRoute</p>
                      <p className="text-sm text-gray-600">Dedicated connection for media traffic</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average bandwidth usage</span>
                    <span className="font-semibold text-gray-900">245 Mbps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Peak concurrent calls</span>
                    <span className="font-semibold text-gray-900">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Network availability</span>
                    <span className="font-semibold text-green-600">99.98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Media quality score</span>
                    <span className="font-semibold text-green-600">4.8/5.0</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-blue-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Network performance trending up 12% this month
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Network & Quality of Service</h1>
        <p className="text-gray-600">Monitor network performance and configure QoS for optimal Teams experience</p>
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

export default Network;