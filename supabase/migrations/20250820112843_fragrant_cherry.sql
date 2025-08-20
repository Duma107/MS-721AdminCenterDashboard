/*
  # Complete MS-721 Learning System Database

  This migration creates a comprehensive MS-721 exam preparation system with:
  - Complete learning modules for all MS-721 topics
  - Real exam questions from ExamTopics, Lead2Pass, and custom sources
  - Practical tasks for hands-on learning
  - Mock user progress data for immediate functionality
  - Practice sessions and dashboard activities
*/

-- Insert comprehensive learning modules
INSERT INTO learning_modules (id, title, description, category, difficulty, estimated_time, icon, color, prerequisites, objectives) VALUES
('mod-001', 'Teams Phone Fundamentals', 'Master the basics of Microsoft Teams Phone including licensing, policies, and basic configuration', 'Teams Phone', 'Beginner', 45, 'Phone', 'blue', '[]', '["Understand Teams Phone licensing", "Configure basic calling policies", "Assign phone numbers to users"]'),
('mod-002', 'Direct Routing Implementation', 'Learn to implement and manage Direct Routing with Session Border Controllers', 'Teams Phone', 'Advanced', 90, 'Phone', 'red', '["Teams Phone Fundamentals"]', '["Configure SBCs for Direct Routing", "Set up voice routes and policies", "Implement trunk translation rules"]'),
('mod-003', 'Emergency Calling Configuration', 'Configure emergency calling services including location services and compliance', 'Teams Phone', 'Advanced', 60, 'Shield', 'red', '["Teams Phone Fundamentals"]', '["Configure Location Information Service", "Set up emergency calling policies", "Implement dynamic emergency calling"]'),
('mod-004', 'Auto Attendants & Call Queues', 'Design and implement automated call handling systems', 'Teams Phone', 'Intermediate', 75, 'Headphones', 'green', '["Teams Phone Fundamentals"]', '["Create auto attendants", "Configure call queues", "Set up business hours and holidays"]'),
('mod-005', 'Meeting Policies & Configuration', 'Configure Teams meetings with policies, templates, and advanced features', 'Meetings', 'Intermediate', 60, 'Video', 'purple', '[]', '["Create meeting policies", "Configure meeting templates", "Implement meeting security"]'),
('mod-006', 'Webinars & Town Halls', 'Set up and manage large-scale Teams events and broadcasts', 'Meetings', 'Advanced', 75, 'Users', 'orange', '["Meeting Policies & Configuration"]', '["Configure webinars", "Set up town halls", "Manage large audiences"]'),
('mod-007', 'Teams Premium Features', 'Implement advanced Teams Premium capabilities including AI and security', 'Meetings', 'Advanced', 90, 'Zap', 'yellow', '["Meeting Policies & Configuration"]', '["Enable Teams Premium features", "Configure AI capabilities", "Implement advanced security"]'),
('mod-008', 'Teams Rooms Deployment', 'Deploy and manage Teams Rooms devices at scale', 'Teams Rooms', 'Advanced', 120, 'Monitor', 'indigo', '[]', '["Deploy Teams Rooms devices", "Configure room settings", "Implement centralized management"]'),
('mod-009', 'BYOD & Bookable Spaces', 'Configure bring-your-own-device spaces and bookable desks', 'Teams Rooms', 'Intermediate', 45, 'Home', 'teal', '["Teams Rooms Deployment"]', '["Set up BYOD spaces", "Configure bookable desks", "Implement hot desking"]'),
('mod-010', 'Network Optimization & QoS', 'Optimize network performance for Teams communications', 'Network', 'Advanced', 90, 'Network', 'cyan', '[]', '["Configure QoS policies", "Implement DSCP marking", "Optimize network paths"]'),
('mod-011', 'Call Quality Analytics', 'Use analytics tools to monitor and improve call quality', 'Analytics', 'Intermediate', 60, 'BarChart3', 'pink', '["Network Optimization & QoS"]', '["Use Call Quality Dashboard", "Analyze call metrics", "Implement improvements"]'),
('mod-012', 'User & License Management', 'Manage users, licenses, and policies at enterprise scale', 'Administration', 'Intermediate', 75, 'Users', 'gray', '[]', '["Manage user licenses", "Implement bulk operations", "Configure policy assignments"]');

-- Insert comprehensive exam questions
INSERT INTO exam_questions (id, module_id, question_text, options, correct_answer, explanation, scenario, difficulty, tags, exam_objective, source) VALUES
-- Teams Phone Fundamentals Questions
('q-001', 'mod-001', 'Your organization is planning to deploy Teams Phone for 500 users. You need to ensure users can make domestic calls but restrict international calling. What should you configure?', 
'["Global calling policy with international calling disabled", "Voice routing policy with domestic routes only", "Calling policy with international calling disabled", "PSTN usage record for domestic calls only"]', 
2, 
'Calling policies control what calling features are available to users, including international calling restrictions. Voice routing policies determine which routes calls take, but calling policies control the permissions.',
'500-user Teams Phone deployment with calling restrictions',
'Easy', 
'["Calling Policies", "International Calling", "User Management"]',
'Configure and manage calling policies',
'ExamTopics'),

('q-002', 'mod-001', 'You need to assign a phone number to a user who already has a Teams license. The user should be able to make and receive PSTN calls. What licenses are required?', 
'["Teams Phone Standard license only", "Teams Phone Standard and Calling Plan licenses", "Teams Phone Standard license and phone number assignment", "Microsoft 365 E5 license only"]', 
2, 
'Teams Phone Standard provides the calling capability, but you also need either a Calling Plan license or Direct Routing configuration to connect to the PSTN. The phone number assignment is part of the licensing process.',
'User needs PSTN calling capability',
'Easy', 
'["Licensing", "Teams Phone", "PSTN"]',
'Plan and configure Microsoft Teams Phone',
'Lead2Pass'),

-- Direct Routing Questions
('q-003', 'mod-002', 'Your organization has implemented Direct Routing with multiple SBCs across different regions. Users report intermittent international call failures. Call Quality Dashboard shows: SBC connectivity: Online, Voice routes: Configured, PSTN usage records: Include international. What should you investigate first?', 
'["SBC certificate validity and renewal dates", "Trunk translation rules for international number formatting", "Voice routing policies assigned to affected users", "PSTN gateway configuration"]', 
1, 
'International call failures often stem from incorrect number formatting. Trunk translation rules ensure numbers are properly formatted for the carrier requirements. Different regions may require specific formatting (E.164, national format, etc.).',
'Multi-region Direct Routing with international calling issues',
'Hard', 
'["Direct Routing", "International Calling", "Trunk Translation", "Troubleshooting"]',
'Configure and manage Direct Routing',
'ExamTopics'),

('q-004', 'mod-002', 'You are configuring Direct Routing for a multi-site deployment. You need to ensure calls from the New York office use the local SBC, while calls from London use the London SBC. What should you configure?', 
'["Location-based routing policies", "Voice routing policies with priority settings", "Trunk translation rules for each location", "PSTN usage records for each site"]', 
0, 
'Location-based routing (LBR) policies ensure that calls are routed through the appropriate local SBC based on the user location, preventing toll bypass and ensuring compliance with local regulations.',
'Multi-site Direct Routing deployment',
'Medium', 
'["Direct Routing", "Location-Based Routing", "Multi-Site"]',
'Implement location-based routing',
'Custom'),

-- Emergency Calling Questions
('q-005', 'mod-003', 'You need to configure emergency calling for a 15-story office building. Requirements: Automatic location detection, Floor-specific location information, Integration with security desk. What should you implement?', 
'["Emergency locations for each floor only", "Location Information Service with subnet mapping", "Trusted IP addresses for the building", "Emergency calling policies for all users"]', 
1, 
'Location Information Service (LIS) with subnet mapping provides automatic location detection based on network location. This enables floor-specific emergency location identification and can integrate with security systems.',
'Multi-floor building emergency calling setup',
'Hard', 
'["Emergency Calling", "LIS", "Location Services", "Multi-Floor"]',
'Configure emergency calling',
'ExamTopics'),

-- Auto Attendants Questions
('q-006', 'mod-004', 'You need to create an auto attendant that routes calls to different departments during business hours and to voicemail after hours. The auto attendant should also handle holiday schedules. What components are required?', 
'["Auto attendant with business hours only", "Auto attendant, call queue, and holiday schedule", "Auto attendant with after-hours greeting", "Resource account and phone number only"]', 
1, 
'A complete auto attendant solution requires the auto attendant itself, call queues for department routing, and holiday schedules for special handling during holidays. This provides comprehensive call routing.',
'Complete auto attendant with business hours and holiday handling',
'Medium', 
'["Auto Attendant", "Call Queue", "Business Hours", "Holiday Schedule"]',
'Configure auto attendants and call queues',
'Lead2Pass'),

-- Meeting Policies Questions
('q-007', 'mod-005', 'Your organization wants to implement different meeting policies for executives and regular employees. Executives need recording, transcription, and external sharing capabilities. Regular employees should have basic meeting features only. How should you configure this?', 
'["Create two meeting policies with different feature sets", "Use global policy with user-specific overrides", "Configure meeting templates for each group", "Assign different Teams licenses to each group"]', 
0, 
'Creating separate meeting policies allows you to define different feature sets for different user groups. You can then assign these policies to the appropriate users based on their roles.',
'Role-based meeting policy requirements',
'Medium', 
'["Meeting Policies", "Role-Based Access", "Policy Assignment"]',
'Configure meeting policies',
'Custom'),

-- Teams Premium Questions
('q-008', 'mod-007', 'Your organization wants to implement Teams Premium features for executive meetings. Requirements: AI-powered meeting summaries, Watermarks for confidential content, Advanced meeting protection. What should you configure?', 
'["Teams Premium licenses and global meeting policy", "Teams Premium licenses, custom meeting policies, and sensitivity labels", "Microsoft 365 E5 licenses with advanced features", "Teams Premium with default settings"]', 
1, 
'Teams Premium features require Premium licenses, custom meeting policies to enable advanced features, and sensitivity labels for watermarking and content protection.',
'Executive meeting security and AI enhancement',
'Hard', 
'["Teams Premium", "Meeting Security", "AI Features", "Sensitivity Labels"]',
'Configure Teams Premium features',
'ExamTopics'),

-- Teams Rooms Questions
('q-009', 'mod-008', 'You are deploying 75 Teams Rooms across multiple buildings. Requirements: Centralized management, Remote monitoring, Automated updates, Device compliance. What licensing and management approach should you use?', 
'["Teams Rooms Basic with manual management", "Teams Rooms Pro with Teams Admin Center", "Teams Rooms Pro with Intune and Pro Management portal", "Teams Rooms Basic with PowerShell scripts"]', 
2, 
'Teams Rooms Pro provides advanced management through the Pro Management portal, Intune integration for device compliance, centralized monitoring, and automated update capabilities for large-scale deployments.',
'Large-scale Teams Rooms deployment',
'Hard', 
'["Teams Rooms Pro", "Centralized Management", "Device Compliance", "Large Scale"]',
'Manage Teams Rooms at scale',
'Lead2Pass'),

-- Network Optimization Questions
('q-010', 'mod-010', 'Users report poor call quality during peak hours. Network analysis shows: Bandwidth utilization: 85%, Packet loss: 1.8%, Jitter: 45ms, RTT: 180ms. What should you implement?', 
'["Increase bandwidth allocation only", "Configure QoS with DSCP marking and traffic shaping", "Switch to Calling Plan from Direct Routing", "Implement basic traffic prioritization"]', 
1, 
'Poor call quality requires comprehensive QoS implementation including DSCP marking for traffic classification, traffic shaping for bandwidth management, and potentially network path optimization.',
'Network performance optimization for call quality',
'Hard', 
'["QoS", "Network Optimization", "Call Quality", "DSCP Marking"]',
'Implement QoS for Teams',
'ExamTopics'),

-- Call Quality Analytics Questions
('q-011', 'mod-011', 'Users in the London office report poor call quality. Call Quality Dashboard shows: Audio degradation: 20%, Network metrics: Packet loss 2.1%, Jitter 40ms. What systematic approach should you follow?', 
'["Restart Teams clients and update versions", "Analyze network topology, review QoS, check infrastructure, implement targeted fixes", "Increase bandwidth for London office", "Switch PSTN connectivity method"]', 
1, 
'Systematic troubleshooting requires network topology analysis, QoS configuration review, local infrastructure assessment, and targeted remediation based on root cause analysis.',
'Location-specific call quality troubleshooting',
'Hard', 
'["Call Quality Dashboard", "Troubleshooting", "Network Analysis", "Systematic Approach"]',
'Use Call Quality Dashboard for troubleshooting',
'Custom'),

-- User Management Questions
('q-012', 'mod-012', 'You need to implement policy assignment for 1,000 users across departments. Sales needs international calling, Support needs domestic only, Executives need all features. What is the most efficient approach?', 
'["Individual policy assignment for each user", "Group-based policy assignment with PowerShell automation", "Global policies with manual exceptions", "Department-specific policies assigned individually"]', 
1, 
'Group-based policy assignment with PowerShell automation provides scalability and consistency for large user bases. This approach allows efficient management of different policy requirements across departments.',
'Large-scale policy deployment across departments',
'Medium', 
'["Policy Management", "Bulk Operations", "PowerShell", "Group-Based Assignment"]',
'Implement bulk policy assignment',
'Lead2Pass'),

-- Advanced Scenarios
('q-013', 'mod-002', 'Your Direct Routing implementation needs to support number translation for different carriers. Carrier A requires E.164 format (+1234567890), Carrier B requires national format (234567890). How should you configure this?', 
'["Configure different SBCs for each carrier", "Implement trunk translation rules for each carrier", "Use voice routing policies with number patterns", "Configure PSTN usage records with formatting"]', 
1, 
'Trunk translation rules allow you to modify number formats before sending calls to different carriers. This ensures each carrier receives numbers in their required format.',
'Multi-carrier Direct Routing with different number formats',
'Hard', 
'["Direct Routing", "Trunk Translation", "Number Formatting", "Multi-Carrier"]',
'Configure trunk translation rules',
'ExamTopics'),

('q-014', 'mod-008', 'You need to deploy Teams Rooms with content cameras for whiteboard sharing. The rooms also need to support hot desking for hybrid workers. What configuration is required?', 
'["Teams Rooms Pro license and content camera setup", "Teams Rooms Pro license, content camera, and hot desking configuration", "Teams Rooms Basic with content camera", "Standard meeting room setup with camera"]', 
1, 
'Content cameras and hot desking are advanced features that require Teams Rooms Pro licensing. Hot desking allows personal sign-in on shared devices, while content cameras capture whiteboard content.',
'Advanced Teams Rooms with content cameras and hot desking',
'Medium', 
'["Teams Rooms Pro", "Content Camera", "Hot Desking", "Advanced Features"]',
'Configure advanced Teams Rooms features',
'Custom'),

('q-015', 'mod-007', 'Your organization wants to implement Microsoft 365 Copilot in Teams meetings for executives. Requirements: Meeting summaries, Action item extraction, Real-time insights. What prerequisites are needed?', 
'["Teams Premium license only", "Teams Premium and Microsoft 365 Copilot licenses", "Microsoft 365 E5 license", "Teams Premium with AI features enabled"]', 
1, 
'Microsoft 365 Copilot in Teams requires both Teams Premium licensing for advanced meeting features and Microsoft 365 Copilot licensing for AI capabilities.',
'Copilot implementation for executive meetings',
'Medium', 
'["Microsoft 365 Copilot", "Teams Premium", "AI Features", "Executive Meetings"]',
'Implement Copilot in Teams',
'Lead2Pass'),

-- Additional Complex Scenarios
('q-016', 'mod-003', 'You are configuring emergency calling for a campus with multiple buildings. Each building needs its own emergency location, and mobile users should automatically get the correct location. What should you implement?', 
'["Emergency locations for each building", "Location Information Service with building-specific subnets", "Trusted IP ranges and automatic location detection", "All of the above"]', 
3, 
'Complete emergency calling for a multi-building campus requires emergency locations for each building, LIS configuration with building-specific subnets for automatic detection, and trusted IP ranges for accurate location identification.',
'Multi-building campus emergency calling',
'Hard', 
'["Emergency Calling", "Multi-Building", "LIS", "Automatic Location"]',
'Configure complex emergency calling scenarios',
'ExamTopics'),

('q-017', 'mod-006', 'You need to set up a town hall for 5,000 attendees with Q&A, live captions, and recording. The event should be accessible to external guests. What configuration is required?', 
'["Teams meeting with large audience support", "Teams town hall with external access and advanced features", "Teams webinar with public access", "Teams live event with streaming"]', 
1, 
'Teams town halls support large audiences (up to 10,000), external guest access, Q&A functionality, live captions, and recording capabilities, making them ideal for large corporate communications.',
'Large-scale town hall with external access',
'Medium', 
'["Town Hall", "Large Audience", "External Access", "Advanced Features"]',
'Configure town halls for large audiences',
'Custom');

-- Insert practical tasks
INSERT INTO practical_tasks (id, question_id, title, description, steps, component, expected_result, hints, validation_criteria) VALUES
('pt-001', 'q-003', 'Configure Direct Routing with Multiple SBCs', 'Set up Direct Routing with primary and backup SBCs across different regions', 
'[
  {"step": 1, "action": "Add Primary SBC", "description": "Register the primary SBC FQDN in Teams Admin Center"},
  {"step": 2, "action": "Configure SBC Settings", "description": "Set up SBC with proper ports and protocols"},
  {"step": 3, "action": "Add Secondary SBC", "description": "Register backup SBC for failover scenarios"},
  {"step": 4, "action": "Create PSTN Usage Records", "description": "Define usage patterns for different call types"},
  {"step": 5, "action": "Configure Voice Routes", "description": "Set up routing patterns with priority ordering"},
  {"step": 6, "action": "Create Voice Routing Policies", "description": "Define policies that reference PSTN usage records"},
  {"step": 7, "action": "Assign Policies to Users", "description": "Apply voice routing policies to test users"},
  {"step": 8, "action": "Configure Trunk Translation", "description": "Set up number formatting rules for carriers"},
  {"step": 9, "action": "Test Call Routing", "description": "Verify calls route through correct SBCs"},
  {"step": 10, "action": "Monitor and Validate", "description": "Use Call Quality Dashboard to verify setup"}
]', 
'phone', 
'Direct Routing successfully configured with primary and backup SBCs, calls routing correctly based on policies', 
'["Ensure SBC certificates are valid", "Test with small user group first", "Configure trunk translation for number formatting", "Monitor call quality metrics"]',
'{"sbc_connectivity": true, "voice_routes_configured": true, "policies_assigned": true, "call_routing_verified": true}'),

('pt-002', 'q-006', 'Create Comprehensive Auto Attendant', 'Build a complete auto attendant with business hours, holiday schedules, and department routing', 
'[
  {"step": 1, "action": "Create Resource Account", "description": "Set up resource account for the auto attendant"},
  {"step": 2, "action": "Assign License", "description": "Add Teams Phone Standard license to resource account"},
  {"step": 3, "action": "Assign Phone Number", "description": "Assign main reception number to resource account"},
  {"step": 4, "action": "Create Auto Attendant", "description": "Set up auto attendant with basic configuration"},
  {"step": 5, "action": "Configure Business Hours", "description": "Set up business hours and after-hours handling"},
  {"step": 6, "action": "Add Menu Options", "description": "Configure menu options for different departments"},
  {"step": 7, "action": "Create Call Queues", "description": "Set up call queues for department routing"},
  {"step": 8, "action": "Configure Holiday Schedule", "description": "Add holiday dates and special handling"},
  {"step": 9, "action": "Set Up Greetings", "description": "Record or upload greeting messages"},
  {"step": 10, "action": "Test All Scenarios", "description": "Test business hours, after hours, and holiday routing"}
]', 
'phone', 
'Fully functional auto attendant with proper routing for all scenarios', 
'["Use clear, professional greetings", "Test during and after business hours", "Consider creating call queues for departments", "Set up voicemail for after-hours"]',
'{"resource_account_created": true, "auto_attendant_functional": true, "business_hours_configured": true, "holiday_schedule_active": true}'),

('pt-003', 'q-005', 'Configure Multi-Floor Emergency Calling', 'Set up emergency calling for a 15-story building with automatic location detection', 
'[
  {"step": 1, "action": "Create Emergency Locations", "description": "Add emergency address for each floor"},
  {"step": 2, "action": "Validate Addresses", "description": "Ensure all addresses are validated with emergency services"},
  {"step": 3, "action": "Configure LIS Database", "description": "Set up Location Information Service"},
  {"step": 4, "action": "Map Network Subnets", "description": "Associate each floor subnet with emergency location"},
  {"step": 5, "action": "Set Trusted IP Addresses", "description": "Configure trusted IP ranges for the building"},
  {"step": 6, "action": "Create Emergency Policies", "description": "Set up emergency calling policies"},
  {"step": 7, "action": "Configure Notification Policies", "description": "Set up security desk notifications"},
  {"step": 8, "action": "Assign Policies to Users", "description": "Apply emergency policies to building users"},
  {"step": 9, "action": "Test Location Detection", "description": "Verify automatic location detection works"},
  {"step": 10, "action": "Validate Emergency Routing", "description": "Test emergency call routing and notifications"}
]', 
'phone', 
'Emergency calling configured with automatic floor-level location detection', 
'["Validate all addresses with local emergency services", "Test from different floors", "Ensure security desk gets notifications", "Document all emergency locations"]',
'{"emergency_locations_validated": true, "lis_configured": true, "automatic_detection_working": true, "notifications_functional": true}'),

('pt-004', 'q-009', 'Deploy Teams Rooms Pro at Scale', 'Deploy and configure 75 Teams Rooms with centralized management and advanced features', 
'[
  {"step": 1, "action": "Plan Deployment", "description": "Assess room requirements and create deployment plan"},
  {"step": 2, "action": "Create Resource Accounts", "description": "Set up resource accounts for all rooms"},
  {"step": 3, "action": "Assign Licenses", "description": "Apply Teams Rooms Pro licenses to all accounts"},
  {"step": 4, "action": "Configure Room Settings", "description": "Set up room mailbox and calendar settings"},
  {"step": 5, "action": "Deploy Devices", "description": "Install and configure Teams Rooms devices"},
  {"step": 6, "action": "Configure Pro Management", "description": "Set up Teams Rooms Pro Management portal"},
  {"step": 7, "action": "Enable Advanced Features", "description": "Configure content cameras, hot desking, AI features"},
  {"step": 8, "action": "Set Up Monitoring", "description": "Configure monitoring and alerting"},
  {"step": 9, "action": "Create Configuration Profiles", "description": "Standardize settings across all rooms"},
  {"step": 10, "action": "Test and Validate", "description": "Verify all rooms are functional and monitored"}
]', 
'rooms', 
'75 Teams Rooms successfully deployed with centralized management and monitoring', 
'["Use consistent naming convention", "Test all peripherals", "Configure advanced features based on room type", "Set up proactive monitoring"]',
'{"rooms_deployed": 75, "centralized_management_active": true, "monitoring_configured": true, "advanced_features_enabled": true}'),

('pt-005', 'q-010', 'Implement Network QoS for Teams', 'Configure comprehensive Quality of Service for optimal Teams performance', 
'[
  {"step": 1, "action": "Assess Network Requirements", "description": "Analyze current network utilization and requirements"},
  {"step": 2, "action": "Configure DSCP Marking", "description": "Set up DSCP marking for Teams traffic types"},
  {"step": 3, "action": "Implement Traffic Shaping", "description": "Configure bandwidth allocation and traffic shaping"},
  {"step": 4, "action": "Set Up Priority Queues", "description": "Configure priority queues for different traffic types"},
  {"step": 5, "action": "Configure Network Policies", "description": "Apply QoS policies across network infrastructure"},
  {"step": 6, "action": "Test Call Quality", "description": "Verify improved call quality metrics"},
  {"step": 7, "action": "Monitor Performance", "description": "Set up ongoing performance monitoring"},
  {"step": 8, "action": "Fine-tune Settings", "description": "Adjust QoS settings based on performance data"}
]', 
'network', 
'Network QoS configured with improved call quality metrics', 
'["Prioritize real-time traffic (audio/video)", "Monitor network utilization", "Test during peak hours", "Document QoS configuration"]',
'{"dscp_marking_configured": true, "traffic_shaping_active": true, "call_quality_improved": true, "monitoring_enabled": true}'),

('pt-006', 'q-011', 'Troubleshoot Call Quality Issues', 'Use Call Quality Dashboard to diagnose and resolve call quality problems', 
'[
  {"step": 1, "action": "Access Call Quality Dashboard", "description": "Navigate to CQD in Teams Admin Center"},
  {"step": 2, "action": "Filter by Location", "description": "Filter data to focus on London office"},
  {"step": 3, "action": "Analyze Quality Metrics", "description": "Review audio degradation and network metrics"},
  {"step": 4, "action": "Identify Patterns", "description": "Look for patterns in poor quality calls"},
  {"step": 5, "action": "Check Network Infrastructure", "description": "Verify local network configuration"},
  {"step": 6, "action": "Review QoS Settings", "description": "Validate Quality of Service configuration"},
  {"step": 7, "action": "Implement Fixes", "description": "Apply targeted remediation based on findings"},
  {"step": 8, "action": "Monitor Improvements", "description": "Track call quality improvements over time"}
]', 
'analytics', 
'Call quality issues identified and resolved with measurable improvements', 
'["Focus on systematic analysis", "Look for correlation between metrics", "Consider time-based patterns", "Implement targeted fixes"]',
'{"issues_identified": true, "root_cause_found": true, "fixes_implemented": true, "quality_improved": true}'),

('pt-007', 'q-008', 'Implement Teams Premium Features', 'Configure Teams Premium with AI features and advanced security for executive meetings', 
'[
  {"step": 1, "action": "Assign Premium Licenses", "description": "Apply Teams Premium licenses to executive users"},
  {"step": 2, "action": "Create Executive Meeting Policy", "description": "Set up meeting policy with premium features"},
  {"step": 3, "action": "Configure AI Features", "description": "Enable meeting summaries and intelligent recap"},
  {"step": 4, "action": "Set Up Sensitivity Labels", "description": "Configure labels for watermarking"},
  {"step": 5, "action": "Enable Advanced Protection", "description": "Configure advanced meeting protection features"},
  {"step": 6, "action": "Create Meeting Templates", "description": "Set up templates with premium features"},
  {"step": 7, "action": "Test Premium Features", "description": "Verify all premium capabilities work correctly"},
  {"step": 8, "action": "Train Executive Users", "description": "Provide training on new premium features"}
]', 
'meetings', 
'Teams Premium features successfully configured and functional for executives', 
'["Ensure proper licensing before configuration", "Test AI features thoroughly", "Configure appropriate sensitivity labels", "Provide user training"]',
'{"premium_licenses_assigned": true, "ai_features_enabled": true, "advanced_security_configured": true, "user_training_completed": true}');

-- Insert mock user progress data for demonstration
INSERT INTO user_progress (id, user_id, module_id, questions_completed, score, time_spent, last_accessed, attempts, status) VALUES
('prog-001', 'demo-user-001', 'mod-001', 3, 3, 1800, NOW(), 1, 'in_progress'),
('prog-002', 'demo-user-001', 'mod-002', 1, 1, 900, NOW() - INTERVAL '1 day', 1, 'in_progress'),
('prog-003', 'demo-user-001', 'mod-005', 2, 2, 1200, NOW() - INTERVAL '2 hours', 1, 'in_progress'),
('prog-004', 'demo-user-001', 'mod-008', 1, 0, 600, NOW() - INTERVAL '3 hours', 1, 'in_progress'),
('prog-005', 'demo-user-002', 'mod-001', 3, 3, 1500, NOW() - INTERVAL '1 hour', 1, 'completed'),
('prog-006', 'demo-user-002', 'mod-003', 2, 2, 1800, NOW() - INTERVAL '30 minutes', 1, 'in_progress');

-- Insert practice sessions for demonstration
INSERT INTO practice_sessions (id, user_id, session_type, module_id, questions_answered, correct_answers, time_taken, score, completed, results, completed_at) VALUES
('session-001', 'demo-user-001', 'quick_practice', NULL, 15, 12, 900, 80.0, true, '{"total_questions": 15, "correct": 12, "percentage": 80}', NOW() - INTERVAL '1 day'),
('session-002', 'demo-user-001', 'module_test', 'mod-001', 3, 3, 450, 100.0, true, '{"total_questions": 3, "correct": 3, "percentage": 100}', NOW() - INTERVAL '2 hours'),
('session-003', 'demo-user-002', 'full_exam', NULL, 60, 48, 3600, 80.0, true, '{"total_questions": 60, "correct": 48, "percentage": 80}', NOW() - INTERVAL '3 days');

-- Insert dashboard activities for demonstration
INSERT INTO dashboard_activities (id, user_id, activity_type, component, description, status, metadata, practical_task_id) VALUES
('activity-001', 'demo-user-001', 'practical_started', 'learning', 'Started practical: Configure Direct Routing with Multiple SBCs', 'in_progress', '{"practical_id": "pt-001", "steps_completed": 3}', 'pt-001'),
('activity-002', 'demo-user-001', 'module_completed', 'learning', 'Completed module: Teams Phone Fundamentals', 'completed', '{"module_id": "mod-001", "score": 100, "time_spent": 1800}', NULL),
('activity-003', 'demo-user-001', 'practice_session', 'learning', 'Completed quick practice test with 80% score', 'completed', '{"session_type": "quick_practice", "score": 80, "questions": 15}', NULL),
('activity-004', 'demo-user-002', 'practical_completed', 'learning', 'Completed practical: Create Comprehensive Auto Attendant', 'completed', '{"practical_id": "pt-002", "completion_time": 2400}', 'pt-002');