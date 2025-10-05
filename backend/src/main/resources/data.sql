-- USERS
insert into app_user (id, name, type)
values
 ('11111111-1111-1111-1111-111111111111', 'João Silva', 'STUDENT'),
 ('22222222-2222-2222-2222-222222222222', 'Maria Oliveira', 'STUDENT'),
 ('33333333-3333-3333-3333-333333333333', 'Prof. Ana Souza', 'ADVISOR'),
 ('44444444-4444-4444-4444-444444444444', 'Prof. Carlos Lima', 'COORDINATOR');

-- PROJECTS
insert into project (id, title, format, advisor_user_id, research_question)
values
 ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Análise de Algoritmos Genéticos', 'Monografia', '33333333-3333-3333-3333-333333333333', 'Como algoritmos genéticos podem otimizar problemas complexos?'),
 ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Impacto da IA na Educação', 'Artigo', '33333333-3333-3333-3333-333333333333', 'Como a IA está transformando o ensino superior?');

-- PROJECT_USER (ManyToMany)
insert into project_user (user_id, project_id)
values
 ('11111111-1111-1111-1111-111111111111', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
 ('22222222-2222-2222-2222-222222222222', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- STAGES
insert into stage (id, name, stage_status, gate_status, created_at, updated_at, due_date, project_id)
values
 ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'STAGE_1', 'IN_PROGRESS', 'PENDING', '2025-10-01T09:00:00', '2025-10-05T10:00:00', '2025-10-20', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
 ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'STAGE_2', 'PENDING', 'PENDING', '2025-10-02T09:00:00', '2025-10-05T10:00:00', '2025-10-30', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- PROJECT_FEEDBACK
insert into project_feedback (id, reviewer_user_id, review_text, created_at, project_id)
values
 ('ccccccc1-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'O tema é relevante e bem definido.', '2025-10-05T09:00:00', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
 ('ccccccc2-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 'Boa estrutura de pesquisa e metodologia.', '2025-10-05T09:30:00', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- GATE_FEEDBACK
insert into gate_feedback (id, reviewer_user_id, method_grade, execution_possibility_grade, ethics_grade, review_text, gate_status, stage_id)
values
 ('ddddddd1-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333', 8, 9, 10, 'Metodologia adequada e aplicável.', 'APPROVED', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
 ('ddddddd2-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 7, 8, 9, 'Eticamente sólida, mas requer ajustes.', 'REVIEW_REQUESTED', 'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb');
