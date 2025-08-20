import React, { useState } from 'react';
import { 
  Monitor, 
  Plus, 
  Settings, 
  Wifi, 
  Camera, 
  Mic,
  Speaker,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  MapPin,
  Smartphone,
  Calendar,
  Users,
  Shield,
  Zap,
  BookOpen,
  Home
} from 'lucide-react';

const TeamsRooms: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const roomStats = [
    { label: 'Total Rooms', value: '127', change: '+8' },
    { label: 'Online Rooms', value: '124', change: '97%' },
    { label: 'Pro Licenses', value: '89', change: '+12' },
    { label: 'BYOD Spaces', value: '45', change: '+15' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'devices', label: 'Devices' },
    { id: 'settings', label: 'Room Settings' },
    { id: 'byod', label: 'BYOD & Bookable Desks' },
    { id: 'deployment', label: 'Deployment' },
  ];

  const rooms = [
    { name: 'Executive Boardroom', location: 'Floor 12, Building A', status: 'online', lastSeen: '2 min ago', type: 'Teams Rooms on Windows', license: 'Pro' },
    { name: 'Marketing Conference Room', location: 'Floor 8, Building B', status: 'online', lastSeen: '5 min ago', type: 'Teams Rooms on Android', license: 'Basic' },
    { name: 'Development Lab', location: 'Floor 3, Building A', status: 'offline', lastSeen: '2 hours ago', type: 'Teams Rooms on Windows', license: 'Pro' },
    { name: 'Client Meeting Room', location: 'Floor 1, Reception', status: 'online', lastSeen: '1 min ago', type: 'Teams Rooms on Android', license: 'Pro' },
  ];

  const deviceHealth = [
    { component: 'Camera', status: 'healthy', rooms: 124, issues: 3 },
    { component: 'Microphone', status: 'healthy', rooms: 124, issues: 0 },
    { component: 'Speakers', status: 'warning', rooms: 121, issues: 6 },
    { component: 'Display', status: 'healthy', rooms: 127, issues: 0 },
  ];

  const byodSpaces = [
    { name: 'Focus Pod 1', type: 'Personal Space', status: 'available', features: ['Wireless Display', 'Camera', 'Microphone'] },
    { name: 'Collaboration Hub', type: 'Team Space', status: 'booked', features: ['Wireless Display', 'Content Camera', 'Whiteboard'] },
    { name: 'Phone Booth 3', type: 'Personal Space', status: 'available', features: ['Noise Cancellation', 'Privacy Screen'] },
  ];

  const bookableDesks = [
    { name: 'Hot Desk A-12', floor: 'Floor 3', status: 'available', amenities: ['Monitor', 'Docking Station', 'Webcam'] },
    { name: 'Hot Desk B-05', floor: 'Floor 5', status: 'booked', amenities: ['Dual Monitor', 'Wireless Charging', 'Webcam'] },
    { name: 'Quiet Desk C-08', floor: 'Floor 2', status: 'maintenance', amenities: ['Monitor', 'Ergonomic Chair'] },
  ];

  const roomTypes = [
    { name: 'Standard Conference Room', capacity: '6-10 people', features: ['Front of Room Display', 'Camera', 'Microphone Array'] },
    { name: 'Executive Boardroom', capacity: '10+ people', features: ['Multiple Displays', 'PTZ Camera', 'Ceiling Microphones', 'Content Camera'] },
    { name: 'Focus Room', capacity: '2-4 people', features: ['Personal Device', 'Touch Console', 'Wireless Display'] },
    { name: 'Open Collaboration', capacity: '4-8 people', features: ['Mobile Display', 'Wireless Presentation', 'BYOD Support'] },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'devices':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Health Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {deviceHealth.map((device, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{device.component}</h4>
                      {device.status === 'healthy' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{device.rooms} rooms operational</p>
                    {device.issues > 0 && (
                      <p className="text-xs text-red-600 mt-1">{device.issues} issues detected</p>
                    )}
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${device.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${(device.rooms / 127) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Teams Rooms Inventory</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Room
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Room Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">License</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{room.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{room.location}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{room.type}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            room.license === 'Pro' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {room.license}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            room.status === 'online' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {room.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{room.lastSeen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Configuration Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Standard Conference Room</h4>
                  <p className="text-sm text-gray-600 mb-3">Default settings for medium rooms (6-10 people)</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auto-start meetings:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proximity join:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Content camera:</span>
                      <span className="font-medium text-gray-600">Disabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hot desking:</span>
                      <span className="font-medium text-gray-600">Disabled</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Executive Boardroom</h4>
                  <p className="text-sm text-gray-600 mb-3">Premium settings for large rooms (10+ people)</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auto-start meetings:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proximity join:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Content camera:</span>
                      <span className="font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI features:</span>
                      <span className="font-medium text-blue-600">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Camera className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Content Camera</h4>
                  <p className="text-sm text-gray-600">Capture whiteboard content automatically</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Zap className="w-6 h-6 text-yellow-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">AI Voice & Video</h4>
                  <p className="text-sm text-gray-600">Intelligent framing and noise reduction</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Smartphone className="w-6 h-6 text-green-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Hot Desking</h4>
                  <p className="text-sm text-gray-600">Personal sign-in on shared devices</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'byod':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">BYOD Spaces</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add BYOD Space
                </button>
              </div>
              <div className="space-y-4">
                {byodSpaces.map((space, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Home className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{space.name}</h4>
                          <p className="text-sm text-gray-600">{space.type}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        space.status === 'available' ? 'bg-green-100 text-green-800' :
                        space.status === 'booked' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {space.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {space.features.map((feature, fIndex) => (
                        <span key={fIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Bookable Desks</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Desk
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookableDesks.map((desk, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{desk.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        desk.status === 'available' ? 'bg-green-100 text-green-800' :
                        desk.status === 'booked' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {desk.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{desk.floor}</p>
                    <div className="space-y-1">
                      {desk.amenities.map((amenity, aIndex) => (
                        <div key={aIndex} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Types Configuration</h3>
              <div className="space-y-4">
                {roomTypes.map((roomType, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{roomType.name}</h4>
                      <span className="text-sm text-gray-600">{roomType.capacity}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {roomType.features.map((feature, fIndex) => (
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

      case 'deployment':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deployment Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Teams Rooms on Windows</h4>
                  <p className="text-sm text-blue-800 mb-3">Full-featured solution for meeting rooms</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Rich application experience</li>
                    <li>• Advanced peripheral support</li>
                    <li>• Custom XML configuration</li>
                    <li>• Domain policy management</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Teams Rooms on Android</h4>
                  <p className="text-sm text-green-800 mb-3">Streamlined solution for modern spaces</p>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• Easy deployment and management</li>
                    <li>• Certified device ecosystem</li>
                    <li>• Cloud-based configuration</li>
                    <li>• Built-in device management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Intune Enrollment</h4>
                  <p className="text-sm text-gray-600">Device compliance and security policies</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Settings className="w-6 h-6 text-green-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Configuration Profiles</h4>
                  <p className="text-sm text-gray-600">Standardized device settings</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <Monitor className="w-6 h-6 text-purple-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Remote Provisioning</h4>
                  <p className="text-sm text-gray-600">Automated device setup and updates</p>
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
              {roomStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <Monitor className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Deploy New Room</h4>
                  <p className="text-sm text-gray-600">Set up Teams Rooms device</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group">
                  <Home className="w-6 h-6 text-green-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Configure BYOD Space</h4>
                  <p className="text-sm text-gray-600">Set up bring-your-own-device rooms</p>
                  <ArrowRight className="w-4 h-4 text-green-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                  <BookOpen className="w-6 h-6 text-purple-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Bookable Desks</h4>
                  <p className="text-sm text-gray-600">Manage hot desk reservations</p>
                  <ArrowRight className="w-4 h-4 text-purple-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <Settings className="w-6 h-6 text-blue-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Configure Settings</h4>
                  <p className="text-sm text-gray-600">Manage room policies and features</p>
                  <ArrowRight className="w-4 h-4 text-blue-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors group">
                  <Zap className="w-6 h-6 text-yellow-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">AI Features</h4>
                  <p className="text-sm text-gray-600">Enable intelligent capabilities</p>
                  <ArrowRight className="w-4 h-4 text-yellow-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">
                  <MapPin className="w-6 h-6 text-indigo-600 mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">Room Discovery</h4>
                  <p className="text-sm text-gray-600">Find and inventory existing rooms</p>
                  <ArrowRight className="w-4 h-4 text-indigo-600 mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Room Status Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Room Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Executive Boardroom updated</p>
                      <p className="text-sm text-gray-600">Firmware update completed successfully</p>
                    </div>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Monitor className="w-5 h-5 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">New BYOD space configured</p>
                      <p className="text-sm text-gray-600">Focus Pod 4 is now available for booking</p>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Hot desk reservation system active</p>
                      <p className="text-sm text-gray-600">15 desks booked for tomorrow</p>
                    </div>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Audio issue detected</p>
                      <p className="text-sm text-gray-600">Development Lab speaker malfunction</p>
                    </div>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Components</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Camera className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">Cameras</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">124</p>
                      <p className="text-xs text-green-600">3 content cameras</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Mic className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">Microphones</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">124</p>
                      <p className="text-xs text-green-600">All working</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Speaker className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">Speakers</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">121</p>
                      <p className="text-xs text-yellow-600">6 issues</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Monitor className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">Displays</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">127</p>
                      <p className="text-xs text-green-600">All operational</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teams Rooms & Devices</h1>
        <p className="text-gray-600">Manage and monitor Teams Rooms, devices, BYOD spaces, and meeting spaces</p>
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

export default TeamsRooms;