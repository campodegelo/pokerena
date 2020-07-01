DROP TABLE IF EXISTS tournaments CASCADE;

CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    date_tournament VARCHAR NOT NULL,
    finished BOOLEAN DEFAULT false,
    value_entry INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
