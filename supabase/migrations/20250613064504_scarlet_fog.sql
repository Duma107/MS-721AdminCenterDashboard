/*
  # Seed Learning System Data

  This migration populates the learning system with MS-721 exam content,
  including modules, questions, and practical tasks.
*/

-- Insert Learning Modules
INSERT INTO learning_modules (id, title, description, category, difficulty, estimated_time, icon, color, prerequisites, objectives) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Teams Phone Implementation', 'Configure and manage Teams Phone, PSTN connectivity, and Direct Routing', 'Teams Phone', 'Advanced', 120, 'Phone', 'blue', ARRAY['Basic Teams knowledge', 'Telephony concepts'], ARRAY['Configure Direct Routing', 'Set up emergency calling', 'Manage phone policies']),
('550e8400-e29b-41d4-a716-446655440002', 'Meetings, Webinars & Town Halls', 'Configure meeting policies, webinars, town halls, and Teams Premium features', 'Meetings', 'Intermediate', 90, 'Video', 'green', ARRAY['Teams administration basics'], ARRAY['Configure meeting policies', 'Set up webinars', 'Manage town halls']),
('550e8400-e29b-41d4-a716-446655440003', 'Teams Rooms & Devices', 'Deploy and manage Teams Rooms, certified devices, and BYOD spaces', 'Devices', 'Advanced', 100, 'Monitor', 'purple', ARRAY['Device management knowledge'], ARRAY['Deploy Teams Rooms', 'Configure BYOD spaces', 'Manage device policies']),
('550e8400-e29b-41d4-a716-446655440004', 'Network & Quality of Service', 'Optimize network performance and configure QoS for Teams', 'Network', 'Advanced', 80, 'Network', 'orange', ARRAY['Network fundamentals'], ARRAY['Configure QoS', 'Optimize call quality', 'Troubleshoot network issues']),
('550e8400-e29b-41d4-a716-446655440005', 'User Management & Policies', 'Manage user licenses, policies, and bulk operations', 'Administration', 'Intermediate', 70, 'Users', 'indigo', ARRAY['Basic administration'], ARRAY['Manage user licenses', 'Configure policies', 'Perform bulk operations']),
('550e8400-e29b-41d4-a716-446655440006', 'Analytics & Call Quality', 'Monitor system health, analyze call quality, and generate reports', 'Analytics', 'Advanced', 60, 'BarChart3', 'red', ARRAY['Teams administration'], ARRAY['Use Call Quality Dashboard', 'Generate reports', 'Troubleshoot issues']);

-- Insert Exam Questions (Teams Phone)
INSERT INTO exam_questions (id, module_id, question_text, options, correct_answer, explanation, scenario, difficulty, tags, exam_objective, source) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 
'Your organization has 500 users across three locations: Seattle (200 users), New York (200 users), and London (100 users). You need to implement Teams Phone with the following requirements: Users must be able to make and receive PSTN calls, Emergency calling must be configured for all locations, Call costs should be predictable and controlled. Which licensing and connectivity solution should you recommend?',
'["Teams Phone Standard + Calling Plan for all users", "Teams Phone Standard + Direct Routing with local SBCs at each location", "Teams Phone Standard + Operator Connect for all locations", "Mix of Calling Plan for Seattle/New York and Direct Routing for London"]',
1,
'Direct Routing with local SBCs provides the most cost-effective solution for multiple locations, allows for local PSTN connectivity, better emergency calling configuration per location, and provides predictable costs through existing telephony contracts.',
'Multi-location Teams Phone deployment with cost optimization and emergency calling requirements',
'Medium',
ARRAY['Direct Routing', 'Multi-location', 'Cost Optimization'],
'Plan and design Teams Phone and PSTN connectivity',
'ExamTopics'),

('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001',
'You are configuring an auto attendant for your company''s main reception. The requirements are: Business hours: Monday-Friday 8 AM to 6 PM, After hours and weekends: Route to voicemail, During business hours: Option 1 for Sales, Option 2 for Support, Option 0 for operator, Holiday schedule must be supported. Which configuration steps are required?',
'["Create auto attendant, configure business hours, add menu options, set after-hours greeting", "Create resource account, assign phone number, create auto attendant, configure call flows, set up holiday schedule", "Create call queue, assign users, configure auto attendant, set business hours", "Assign phone number to user, create auto attendant, configure menu options"]',
1,
'Complete auto attendant setup requires: 1) Resource account creation and licensing, 2) Phone number assignment, 3) Auto attendant configuration with business hours, 4) Call flow setup for different scenarios, 5) Holiday schedule configuration for special dates.',
'Auto attendant configuration for main reception with complex routing requirements',
'Hard',
ARRAY['Auto Attendant', 'Resource Accounts', 'Call Routing'],
'Create and configure auto attendants and call queues',
'ExamTopics'),

('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001',
'Your organization has implemented Direct Routing with multiple SBCs across different regions. Users report that international calls are failing intermittently. The Call Quality Dashboard shows: SBC connectivity: Online, Voice routes: Configured for international patterns, PSTN usage records: Include international calling. What should you investigate first?',
'["Check SBC certificate validity and renewal dates", "Verify trunk translation rules for international number formatting", "Review voice routing policies assigned to affected users", "Validate PSTN gateway configuration for international trunks"]',
1,
'International call failures often stem from incorrect number formatting. Trunk translation rules ensure that numbers are properly formatted for the carrier''s requirements. Different regions may require specific formatting (E.164, national format, etc.).',
'Multi-region Direct Routing deployment with international calling issues',
'Hard',
ARRAY['Direct Routing', 'International Calling', 'Trunk Translation'],
'Configure and manage Direct Routing for Teams Phone',
'Lead2Pass');

-- Insert Practical Tasks
INSERT INTO practical_tasks (id, question_id, title, description, steps, component, expected_result, hints, validation_criteria) VALUES
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001',
'Configure Direct Routing for Multi-Location Deployment',
'Set up Direct Routing with SBCs for multiple office locations',
'[
  {"step": 1, "action": "Navigate to Teams Phone > Direct Routing", "description": "Access the Direct Routing configuration page"},
  {"step": 2, "action": "Add SBC FQDN for Seattle office", "description": "Configure the first Session Border Controller"},
  {"step": 3, "action": "Add SBC FQDN for New York office", "description": "Configure the second Session Border Controller"},
  {"step": 4, "action": "Add SBC FQDN for London office", "description": "Configure the third Session Border Controller"},
  {"step": 5, "action": "Configure voice routes for local calling", "description": "Set up routing patterns for each location"},
  {"step": 6, "action": "Configure voice routes for international calling", "description": "Set up international calling patterns"},
  {"step": 7, "action": "Set up emergency calling policies per location", "description": "Configure location-specific emergency calling"},
  {"step": 8, "action": "Test connectivity and call routing", "description": "Validate the configuration works correctly"}
]',
'phone',
'All SBCs connected, voice routes configured, emergency calling working for all locations',
ARRAY['Ensure SBC certificates are valid', 'Test each location separately', 'Verify emergency address validation'],
'{"sbc_connectivity": true, "voice_routes_configured": true, "emergency_calling_tested": true}'),

('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002',
'Set up Complete Auto Attendant System',
'Configure a comprehensive auto attendant with business hours and holiday schedules',
'[
  {"step": 1, "action": "Create Teams Phone resource account", "description": "Set up the resource account for the auto attendant"},
  {"step": 2, "action": "Assign Teams Phone Standard license", "description": "License the resource account"},
  {"step": 3, "action": "Assign phone number to resource account", "description": "Assign the main reception number"},
  {"step": 4, "action": "Create auto attendant with business hours", "description": "Configure the main auto attendant"},
  {"step": 5, "action": "Configure menu options and call routing", "description": "Set up the call flow options"},
  {"step": 6, "action": "Set up holiday schedule", "description": "Configure special date handling"},
  {"step": 7, "action": "Test all call flows", "description": "Validate the complete configuration"}
]',
'phone',
'Auto attendant operational with proper routing for business hours, after hours, and holidays',
ARRAY['Test during and after business hours', 'Verify holiday schedule works', 'Check all menu options'],
'{"resource_account_created": true, "phone_number_assigned": true, "call_flows_tested": true}');

-- Insert more exam questions for other modules
INSERT INTO exam_questions (id, module_id, question_text, options, correct_answer, explanation, scenario, difficulty, tags, exam_objective, source) VALUES
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002',
'Your organization wants to host a company-wide town hall for 2,000 employees with the following requirements: Live streaming to all employees, Q&A functionality, Recording for later viewing, Integration with Viva Engage for discussion. Which solution should you implement?',
'["Teams Meeting with 2,000 attendees", "Teams Webinar with registration", "Teams Town Hall with eCDN", "Teams Live Event with Stream integration"]',
2,
'Teams Town Hall is specifically designed for large-scale broadcasting to internal audiences, supports up to 10,000 attendees, includes Q&A functionality, automatic recording, and integrates with Viva Engage for post-event discussions.',
'Company-wide communication event with large audience and interactive features',
'Medium',
ARRAY['Town Hall', 'Large Events', 'eCDN'],
'Configure and manage Teams Town halls',
'ExamTopics'),

('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003',
'You need to deploy Teams Rooms in 50 conference rooms across your organization. Requirements include: Automatic meeting join, Content camera for whiteboard sharing, Hot desking capability for personal sign-in, Integration with room booking system, Centralized management and monitoring. Which deployment approach should you use?',
'["Teams Rooms Basic on Android devices", "Teams Rooms Pro on Windows with Intune management", "BYOD spaces with wireless display", "Teams Rooms Basic on Windows"]',
1,
'Teams Rooms Pro on Windows provides all required features: automatic meeting join, content camera support, hot desking, advanced management through Teams Rooms Pro Management portal, and Intune integration for centralized device management.',
'Large-scale Teams Rooms deployment with advanced management requirements',
'Hard',
ARRAY['Teams Rooms Pro', 'Content Camera', 'Hot Desking'],
'Manage and maintain Teams Rooms and devices',
'Lead2Pass'),

('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440004',
'Your organization is experiencing poor call quality during peak hours. Network analysis shows: Bandwidth utilization peaks at 80% during 10 AM - 2 PM, Packet loss increases to 2% during peak times, Jitter varies between 20-50ms, Round-trip time averages 150ms. Which QoS configuration should you implement?',
'["Increase bandwidth and implement basic QoS", "Configure DSCP marking: EF for audio, AF41 for video, AF21 for sharing", "Implement traffic shaping only", "Use default QoS settings and monitor"]',
1,
'Proper DSCP marking ensures Teams traffic is prioritized: EF (46) for audio gives highest priority, AF41 (34) for video ensures good quality, AF21 (18) for application sharing, and CS3 (24) for signaling traffic.',
'Network performance optimization during peak usage hours',
'Medium',
ARRAY['QoS', 'DSCP Marking', 'Call Quality'],
'Specify Teams Quality of Service (QoS) requirements and policies',
'ExamTopics');