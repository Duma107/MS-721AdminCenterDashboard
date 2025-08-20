import { Scenario } from '../types/learning';

export const realWorldScenarios: Scenario[] = [
  {
    id: 'enterprise-phone-deployment',
    title: 'Enterprise Teams Phone Deployment',
    description: 'Deploy Teams Phone for 1,000+ users across multiple locations with Direct Routing, emergency calling, and centralized management.',
    difficulty: 'Advanced',
    estimatedTime: 120,
    objectives: [
      'Configure Direct Routing with multiple SBCs',
      'Implement emergency calling for all locations',
      'Set up auto attendants and call queues',
      'Configure user policies and phone number assignment',
      'Establish monitoring and troubleshooting procedures'
    ],
    prerequisites: [
      'Understanding of SIP and telephony concepts',
      'Knowledge of Teams Phone licensing',
      'Familiarity with PowerShell for Teams'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Plan the Deployment',
        description: 'Analyze requirements and design the Teams Phone architecture',
        component: 'phone',
        action: 'planning',
        expectedResult: 'Complete deployment plan with SBC placement and number allocation',
        hints: [
          'Consider geographic distribution of users',
          'Plan for redundancy and failover',
          'Design emergency calling strategy'
        ]
      },
      {
        id: 'step-2',
        title: 'Configure Direct Routing',
        description: 'Set up SBCs and configure Direct Routing connectivity',
        component: 'phone',
        action: 'configure-direct-routing',
        expectedResult: 'SBCs connected and voice routes configured',
        hints: [
          'Verify SBC certificates',
          'Configure trunk translation rules',
          'Test connectivity with Test-CsOnlineVoiceRouting'
        ]
      },
      {
        id: 'step-3',
        title: 'Implement Emergency Calling',
        description: 'Configure emergency calling for all office locations',
        component: 'phone',
        action: 'configure-emergency',
        expectedResult: 'Emergency calling policies configured and tested',
        hints: [
          'Validate all emergency addresses',
          'Configure Location Information Service',
          'Set up emergency call routing policies'
        ]
      }
    ],
    validation: [
      {
        id: 'val-1',
        description: 'SBC connectivity is established and healthy',
        checkFunction: 'validateSBCConnectivity',
        points: 20
      },
      {
        id: 'val-2',
        description: 'Voice routes are configured for all required patterns',
        checkFunction: 'validateVoiceRoutes',
        points: 25
      },
      {
        id: 'val-3',
        description: 'Emergency calling is functional for all locations',
        checkFunction: 'validateEmergencyCalling',
        points: 30
      },
      {
        id: 'val-4',
        description: 'Users can make and receive PSTN calls',
        checkFunction: 'validatePSTNCalling',
        points: 25
      }
    ]
  },
  {
    id: 'teams-rooms-mass-deployment',
    title: 'Teams Rooms Mass Deployment',
    description: 'Deploy and configure 50+ Teams Rooms across multiple buildings with centralized management, monitoring, and advanced features.',
    difficulty: 'Advanced',
    estimatedTime: 90,
    objectives: [
      'Deploy Teams Rooms Pro across multiple locations',
      'Configure centralized management and monitoring',
      'Implement advanced features like content cameras and hot desking',
      'Set up BYOD spaces and bookable desks',
      'Establish maintenance and support procedures'
    ],
    prerequisites: [
      'Understanding of Teams Rooms licensing',
      'Knowledge of device management with Intune',
      'Familiarity with Teams Rooms hardware'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Plan Room Deployment',
        description: 'Assess room requirements and plan device placement',
        component: 'rooms',
        action: 'planning',
        expectedResult: 'Room inventory and deployment plan completed',
        hints: [
          'Categorize rooms by size and usage',
          'Plan for different device types',
          'Consider network and power requirements'
        ]
      },
      {
        id: 'step-2',
        title: 'Configure Resource Accounts',
        description: 'Create and configure Teams Rooms resource accounts',
        component: 'rooms',
        action: 'configure-accounts',
        expectedResult: 'All resource accounts created with proper licensing',
        hints: [
          'Use consistent naming convention',
          'Configure room mailbox settings',
          'Assign appropriate licenses'
        ]
      },
      {
        id: 'step-3',
        title: 'Deploy and Configure Devices',
        description: 'Deploy Teams Rooms devices and configure settings',
        component: 'rooms',
        action: 'deploy-devices',
        expectedResult: 'All devices deployed and configured with standard settings',
        hints: [
          'Use configuration profiles for consistency',
          'Test all peripherals',
          'Configure advanced features as needed'
        ]
      }
    ],
    validation: [
      {
        id: 'val-1',
        description: 'All Teams Rooms are online and functional',
        checkFunction: 'validateRoomsOnline',
        points: 25
      },
      {
        id: 'val-2',
        description: 'Centralized management is configured and working',
        checkFunction: 'validateCentralizedManagement',
        points: 25
      },
      {
        id: 'val-3',
        description: 'Advanced features are properly configured',
        checkFunction: 'validateAdvancedFeatures',
        points: 25
      },
      {
        id: 'val-4',
        description: 'Monitoring and alerting are functional',
        checkFunction: 'validateMonitoring',
        points: 25
      }
    ]
  },
  {
    id: 'call-quality-troubleshooting',
    title: 'Call Quality Troubleshooting',
    description: 'Diagnose and resolve call quality issues using analytics tools, network analysis, and systematic troubleshooting approaches.',
    difficulty: 'Intermediate',
    estimatedTime: 60,
    objectives: [
      'Use Call Quality Dashboard for analysis',
      'Identify network-related call quality issues',
      'Implement QoS improvements',
      'Configure monitoring and alerting',
      'Document troubleshooting procedures'
    ],
    prerequisites: [
      'Understanding of network fundamentals',
      'Knowledge of Teams call quality metrics',
      'Familiarity with Call Quality Dashboard'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Analyze Call Quality Data',
        description: 'Use Call Quality Dashboard to identify patterns and issues',
        component: 'analytics',
        action: 'analyze-cqd',
        expectedResult: 'Call quality issues identified and categorized',
        hints: [
          'Filter by location and time period',
          'Look for patterns in poor quality calls',
          'Identify common network metrics'
        ]
      },
      {
        id: 'step-2',
        title: 'Investigate Network Issues',
        description: 'Analyze network infrastructure and configuration',
        component: 'network',
        action: 'investigate-network',
        expectedResult: 'Network issues identified and documented',
        hints: [
          'Check QoS configuration',
          'Analyze bandwidth utilization',
          'Review network topology'
        ]
      },
      {
        id: 'step-3',
        title: 'Implement Remediation',
        description: 'Apply fixes and improvements based on analysis',
        component: 'network',
        action: 'implement-fixes',
        expectedResult: 'Network improvements implemented and tested',
        hints: [
          'Configure proper DSCP marking',
          'Implement traffic shaping',
          'Optimize network paths'
        ]
      }
    ],
    validation: [
      {
        id: 'val-1',
        description: 'Call quality metrics show improvement',
        checkFunction: 'validateCallQualityImprovement',
        points: 40
      },
      {
        id: 'val-2',
        description: 'Network configuration is optimized',
        checkFunction: 'validateNetworkOptimization',
        points: 30
      },
      {
        id: 'val-3',
        description: 'Monitoring and alerting are configured',
        checkFunction: 'validateMonitoringSetup',
        points: 30
      }
    ]
  }
];