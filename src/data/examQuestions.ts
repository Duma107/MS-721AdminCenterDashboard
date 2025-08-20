import { Question } from '../types/learning';

export const teamsPhoneQuestions: Question[] = [
  {
    id: 'tp-003',
    category: 'Teams Phone',
    difficulty: 'Hard',
    question: 'Your organization has implemented Direct Routing with multiple SBCs across different regions. Users report that international calls are failing intermittently. The Call Quality Dashboard shows: SBC connectivity: Online, Voice routes: Configured for international patterns, PSTN usage records: Include international calling. What should you investigate first?',
    options: [
      'Check SBC certificate validity and renewal dates',
      'Verify trunk translation rules for international number formatting',
      'Review voice routing policies assigned to affected users',
      'Validate PSTN gateway configuration for international trunks'
    ],
    correctAnswer: 1,
    explanation: 'International call failures often stem from incorrect number formatting. Trunk translation rules ensure that numbers are properly formatted for the carrier\'s requirements. Different regions may require specific formatting (E.164, national format, etc.).',
    scenario: 'Multi-region Direct Routing deployment with international calling issues',
    practicalTask: {
      description: 'Configure trunk translation rules for international calling',
      steps: [
        'Navigate to Voice > Direct Routing',
        'Select the affected SBC',
        'Review current trunk translation rules',
        'Add rules for international number formatting',
        'Test international call routing',
        'Monitor call success rates'
      ],
      component: 'phone'
    },
    tags: ['Direct Routing', 'International Calling', 'Trunk Translation'],
    examObjective: 'Configure and manage Direct Routing for Teams Phone'
  },
  {
    id: 'tp-004',
    category: 'Teams Phone',
    difficulty: 'Medium',
    question: 'You need to configure emergency calling for a new office location in Seattle. Requirements: Address validation for 911 calls, Automatic location detection for mobile users, Integration with security desk for notifications, Compliance with local regulations. Which configuration steps are required?',
    options: [
      'Create emergency location, assign to users, configure notification policies',
      'Configure Location Information Service (LIS), create emergency policies, set up trusted IP addresses, configure emergency call routing',
      'Assign emergency numbers, create call routing policies, configure auto attendant',
      'Set up Direct Routing, configure SBC for emergency calls, assign policies'
    ],
    correctAnswer: 1,
    explanation: 'Complete emergency calling setup requires: LIS configuration for automatic location detection, emergency calling policies for user assignment, trusted IP address configuration for location mapping, and emergency call routing policies for proper call handling.',
    scenario: 'New office location requiring comprehensive emergency calling setup',
    practicalTask: {
      description: 'Set up complete emergency calling for a new location',
      steps: [
        'Navigate to Locations > Emergency addresses',
        'Add and validate the Seattle office address',
        'Configure Location Information Service (LIS)',
        'Set up trusted IP address ranges',
        'Create emergency calling policy',
        'Configure emergency call routing policy',
        'Assign policies to users',
        'Test emergency calling functionality'
      ],
      component: 'phone'
    },
    tags: ['Emergency Calling', 'LIS', 'Location Services'],
    examObjective: 'Configure emergency calling'
  }
];

export const meetingsQuestions: Question[] = [
  {
    id: 'mw-002',
    category: 'Meetings',
    difficulty: 'Hard',
    question: 'Your organization wants to implement Teams Premium features for executive meetings. Requirements: AI-powered meeting summaries, Watermarks for confidential content, Advanced meeting protection, Custom meeting templates with restricted features. Which configuration approach should you use?',
    options: [
      'Assign Teams Premium licenses to all users and configure global policies',
      'Create custom meeting policies for executives, assign Teams Premium licenses, configure sensitivity labels, create meeting templates',
      'Use standard Teams licenses with custom meeting policies',
      'Configure meeting policies with recording restrictions only'
    ],
    correctAnswer: 1,
    explanation: 'Teams Premium features require: Premium licenses for affected users, custom meeting policies with advanced protection settings, sensitivity labels for watermarking, and meeting templates that enforce security requirements.',
    scenario: 'Executive meeting security and AI enhancement requirements',
    practicalTask: {
      description: 'Configure Teams Premium features for executive meetings',
      steps: [
        'Assign Teams Premium licenses to executives',
        'Create executive meeting policy with advanced features',
        'Configure sensitivity labels for watermarking',
        'Create meeting templates with restricted features',
        'Enable AI-powered meeting summaries',
        'Test advanced protection features',
        'Train executives on new capabilities'
      ],
      component: 'meetings'
    },
    tags: ['Teams Premium', 'Meeting Security', 'AI Features'],
    examObjective: 'Configure and manage meeting features, including Teams Premium features'
  }
];

export const teamsRoomsQuestions: Question[] = [
  {
    id: 'tr-002',
    category: 'Teams Rooms',
    difficulty: 'Medium',
    question: 'You are deploying Teams Rooms in 25 conference rooms with the following requirements: Automatic meeting join and content sharing, Integration with room booking system, Centralized monitoring and management, Support for both Windows and Android devices. Which licensing and management approach should you implement?',
    options: [
      'Teams Rooms Basic licenses with manual management',
      'Teams Rooms Pro licenses with Teams Rooms Pro Management portal and Intune integration',
      'Teams Rooms Basic with PowerShell management',
      'Standard Teams licenses with device management'
    ],
    correctAnswer: 1,
    explanation: 'Teams Rooms Pro provides advanced management capabilities through the Pro Management portal, supports both Windows and Android platforms, includes centralized monitoring, and integrates with Intune for comprehensive device management.',
    scenario: 'Large-scale Teams Rooms deployment with centralized management requirements',
    practicalTask: {
      description: 'Deploy Teams Rooms Pro with centralized management',
      steps: [
        'Create Teams Rooms resource accounts',
        'Assign Teams Rooms Pro licenses',
        'Configure room mailbox settings',
        'Deploy devices with appropriate platform',
        'Configure Teams Rooms Pro Management portal',
        'Set up Intune policies for device management',
        'Configure monitoring and alerting',
        'Test room functionality and management'
      ],
      component: 'rooms'
    },
    tags: ['Teams Rooms Pro', 'Device Management', 'Centralized Monitoring'],
    examObjective: 'Manage and maintain Teams Rooms and devices'
  }
];

export const networkQuestions: Question[] = [
  {
    id: 'nq-002',
    category: 'Network',
    difficulty: 'Hard',
    question: 'Your organization is experiencing poor Teams call quality during peak hours. Network analysis reveals: Bandwidth utilization: 85% during peak times, Packet loss: 1.8% average, Jitter: 45ms average, Round-trip time: 180ms. Which comprehensive solution should you implement?',
    options: [
      'Increase bandwidth and implement basic QoS',
      'Configure comprehensive QoS with DSCP marking, implement traffic shaping, optimize network paths, and consider ExpressRoute',
      'Switch to Calling Plan to bypass network issues',
      'Implement only traffic prioritization'
    ],
    correctAnswer: 1,
    explanation: 'Poor call quality requires a comprehensive approach: DSCP marking for traffic prioritization, traffic shaping to manage bandwidth, network path optimization, and potentially ExpressRoute for dedicated connectivity to Microsoft 365.',
    scenario: 'Network performance optimization for Teams call quality',
    practicalTask: {
      description: 'Implement comprehensive network optimization for Teams',
      steps: [
        'Run Network Assessment Tool',
        'Configure DSCP marking policies',
        'Implement traffic shaping rules',
        'Optimize network routing paths',
        'Configure bandwidth allocation',
        'Set up network monitoring',
        'Test call quality improvements',
        'Document network configuration'
      ],
      component: 'network'
    },
    tags: ['QoS', 'Network Optimization', 'Call Quality'],
    examObjective: 'Specify Teams Quality of Service (QoS) requirements and policies'
  }
];

export const userManagementQuestions: Question[] = [
  {
    id: 'um-002',
    category: 'User Management',
    difficulty: 'Medium',
    question: 'You need to implement a policy assignment strategy for 1,000 users across different departments with varying requirements. Sales needs international calling, Support needs domestic only, Executives need all features plus recording. What is the most efficient approach?',
    options: [
      'Create individual policies for each user',
      'Use group-based policy assignment with PowerShell automation and policy packages',
      'Assign global policies and manage exceptions manually',
      'Create department-specific policies and assign individually'
    ],
    correctAnswer: 1,
    explanation: 'Group-based policy assignment with PowerShell automation provides scalability, policy packages bundle related policies for specific roles, and automation ensures consistent application across large user bases.',
    scenario: 'Large-scale policy deployment across multiple departments',
    practicalTask: {
      description: 'Implement automated policy assignment for multiple departments',
      steps: [
        'Create security groups for each department',
        'Design policy packages for each role',
        'Create PowerShell scripts for bulk assignment',
        'Test policy assignment on pilot group',
        'Deploy policies to all departments',
        'Validate policy application',
        'Set up monitoring for policy compliance'
      ],
      component: 'users'
    },
    tags: ['Policy Management', 'Bulk Operations', 'PowerShell'],
    examObjective: 'Create and assign policy packages'
  }
];

export const analyticsQuestions: Question[] = [
  {
    id: 'an-002',
    category: 'Analytics',
    difficulty: 'Hard',
    question: 'Users in the London office report poor call quality. Call Quality Dashboard analysis shows: Audio degradation: 20% of calls, Video poor quality: 30% of calls, Network metrics: Packet loss 2.1%, Jitter 40ms, RTT 220ms. What systematic troubleshooting approach should you follow?',
    options: [
      'Restart all Teams clients and update to latest version',
      'Analyze network path topology, review QoS configuration, check local infrastructure, correlate with usage patterns, implement targeted remediation',
      'Increase bandwidth allocation for London office',
      'Switch to different PSTN connectivity method'
    ],
    correctAnswer: 1,
    explanation: 'Systematic troubleshooting requires: network path analysis using CQD data, QoS configuration verification, local infrastructure review, usage pattern correlation, and targeted remediation based on root cause analysis.',
    scenario: 'Location-specific call quality issues requiring systematic analysis',
    practicalTask: {
      description: 'Perform comprehensive call quality analysis and remediation',
      steps: [
        'Access Call Quality Dashboard',
        'Filter data by London office location',
        'Analyze network metrics and trends',
        'Review QoS configuration for London',
        'Check local network infrastructure',
        'Correlate issues with usage patterns',
        'Implement targeted remediation',
        'Monitor improvements over time'
      ],
      component: 'analytics'
    },
    tags: ['Call Quality Dashboard', 'Troubleshooting', 'Network Analysis'],
    examObjective: 'Configure tenant data upload for the Microsoft Call Quality Dashboard'
  }
];

export const allQuestions: Question[] = [
  ...teamsPhoneQuestions,
  ...meetingsQuestions,
  ...teamsRoomsQuestions,
  ...networkQuestions,
  ...userManagementQuestions,
  ...analyticsQuestions
];