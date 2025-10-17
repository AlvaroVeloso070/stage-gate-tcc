-- =======================================================
-- INSERT PROJECTS
-- =======================================================
INSERT INTO project (id, title, research_question, status, start_date, end_date)
VALUES
('11111111-1111-1111-1111-111111111111', 'Sistema de Apoio à Decisão Acadêmica', 'Como otimizar o processo de aprovação de projetos de pesquisa?', 'IN_PROGRESS', '2025-03-01', '2025-12-15'),
('22222222-2222-2222-2222-222222222222', 'Plataforma de Ensino Gamificada', 'Como aumentar o engajamento dos alunos através de gamificação?', 'IN_PROGRESS', '2025-02-01', '2025-11-30');

-- =======================================================
-- INSERT USERS
-- =======================================================
INSERT INTO app_user (id, name, email, type, project_id)
VALUES
('aaaaaaa1-0000-0000-0000-000000000001', 'Ana Silva', 'ana.silva@example.com', 'STUDENT', '11111111-1111-1111-1111-111111111111'),
('aaaaaaa2-0000-0000-0000-000000000002', 'Bruno Costa', 'bruno.costa@example.com', 'STUDENT', '11111111-1111-1111-1111-111111111111'),
('aaaaaaa3-0000-0000-0000-000000000003', 'Carla Nunes', 'carla.nunes@example.com', 'STUDENT', '22222222-2222-2222-2222-222222222222'),
('aaaaaaa4-0000-0000-0000-000000000004', 'Prof. Diego Rocha', 'diego.rocha@example.com', 'PROFESSOR', NULL),
('aaaaaaa5-0000-0000-0000-000000000005', 'Coord. Eduardo Lima', 'eduardo.lima@example.com', 'COORDINATOR', NULL);

-- =======================================================
-- INSERT GATES
-- =======================================================
INSERT INTO gate (id, number, project_id, name, is_approved, due_date)
VALUES
('bbbbbbb1-0000-0000-0000-000000000001', 1, '11111111-1111-1111-1111-111111111111', 'GATE_1', false, '2025-04-15'),
('bbbbbbb2-0000-0000-0000-000000000002', 2, '11111111-1111-1111-1111-111111111111', 'GATE_2', true, '2025-06-20'),
('bbbbbbb3-0000-0000-0000-000000000003', 1, '22222222-2222-2222-2222-222222222222', 'GATE_1', true, '2025-04-10'),
('bbbbbbb4-0000-0000-0000-000000000004', 2, '22222222-2222-2222-2222-222222222222', 'GATE_2', false, '2025-07-05');

-- =======================================================
-- INSERT MEETINGS
-- =======================================================
INSERT INTO meeting (id, type, professor_id, stage_gate_number, project_id, schedule_date, status)
VALUES
('ccccccc1-0000-0000-0000-000000000001', 'STAGE', 'aaaaaaa4-0000-0000-0000-000000000004', 1, '11111111-1111-1111-1111-111111111111', '2025-03-10 14:00:00', 'COMPLETED'),
('ccccccc2-0000-0000-0000-000000000002', 'GATE',  'aaaaaaa4-0000-0000-0000-000000000004', 2, '11111111-1111-1111-1111-111111111111', '2025-06-25 15:30:00', 'COMPLETED'),
('ccccccc3-0000-0000-0000-000000000003', 'STAGE', 'aaaaaaa4-0000-0000-0000-000000000004', 1, '22222222-2222-2222-2222-222222222222', '2025-03-20 10:00:00', 'COMPLETED'),
('ccccccc4-0000-0000-0000-000000000004', 'GATE',  'aaaaaaa4-0000-0000-0000-000000000004', 2, '22222222-2222-2222-2222-222222222222', '2025-07-10 16:00:00', 'SCHEDULED');

-- =======================================================
-- INSERT MEETING PARTICIPANTS (JOIN TABLE)
-- =======================================================
INSERT INTO meeting_participant (meeting_id, participant_user_id)
VALUES
('ccccccc1-0000-0000-0000-000000000001', 'aaaaaaa1-0000-0000-0000-000000000001'),
('ccccccc1-0000-0000-0000-000000000001', 'aaaaaaa2-0000-0000-0000-000000000002'),

('ccccccc2-0000-0000-0000-000000000002', 'aaaaaaa1-0000-0000-0000-000000000001'),
('ccccccc2-0000-0000-0000-000000000002', 'aaaaaaa2-0000-0000-0000-000000000002'),

('ccccccc3-0000-0000-0000-000000000003', 'aaaaaaa3-0000-0000-0000-000000000003'),
('ccccccc4-0000-0000-0000-000000000004', 'aaaaaaa3-0000-0000-0000-000000000003');

-- =======================================================
-- INSERT MEETING REPORTS
-- =======================================================
INSERT INTO meeting_report (id, feedback, gate_result, report_date, meeting_id)
VALUES
('ddddddd1-0000-0000-0000-000000000001', 'Bom progresso, equipe alinhada com o cronograma.', 'APPROVED', '2025-03-11 09:00:00', 'ccccccc1-0000-0000-0000-000000000001'),
('ddddddd2-0000-0000-0000-000000000002', 'Revisar metodologia de testes.', 'REJECTED', '2025-06-26 10:00:00', 'ccccccc2-0000-0000-0000-000000000002'),
('ddddddd3-0000-0000-0000-000000000003', 'Ótimo desempenho do grupo.', 'APPROVED', '2025-03-21 08:45:00', 'ccccccc3-0000-0000-0000-000000000003');

-- =======================================================
-- FIM DO SCRIPT
-- =======================================================
