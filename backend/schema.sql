-- Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    national_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Life Events (Catalog of events)
CREATE TABLE IF NOT EXISTS life_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) -- Icon name for frontend
);

-- Actions (Steps involved in a life event)
CREATE TABLE IF NOT EXISTS actions (
    id SERIAL PRIMARY KEY,
    life_event_id INTEGER REFERENCES life_events(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    form_schema JSONB, -- JSON structure defining fields needed for this action
    is_required BOOLEAN DEFAULT TRUE,
    order_index INTEGER
);

-- User Progress (Tracking which actions a user has completed)
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action_id INTEGER REFERENCES actions(id),
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, submitted
    submitted_data JSONB,
    submission_date TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Initial Life Events)
INSERT INTO life_events (title, description, icon) VALUES 
('Starting a Small Business', 'Guide to registering and setting up a new business', 'briefcase'),
('Having a Baby', 'Steps for birth registration and health checks', 'baby-carriage')
ON CONFLICT DO NOTHING;

-- Seed Data (Actions for Starting a Business)
INSERT INTO actions (life_event_id, title, description, form_schema, order_index) 
SELECT id, 'Business Name Registration', 'Register your unique business name', '{"fields":[{"name":"business_name","type":"text","label":"Business Name"}]}', 1
FROM life_events WHERE title = 'Starting a Small Business'
ON CONFLICT DO NOTHING;

INSERT INTO actions (life_event_id, title, description, form_schema, order_index) 
SELECT id, 'Tax Registration', 'Register for tax ID', '{"fields":[{"name":"tax_id_type","type":"select","label":"Tax Type"}]}', 2
FROM life_events WHERE title = 'Starting a Small Business'
ON CONFLICT DO NOTHING;
