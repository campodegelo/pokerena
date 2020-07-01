DROP TABLE IF EXISTS ranking CASCADE;

CREATE TABLE ranking (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL REFERENCES users(id),
    tournament_id INT NOT NULL REFERENCES tournaments(id),
    buyin INT DEFAULT 1 NOT NULL,
    addon INT DEFAULT 0 NOT NULL,
    prize INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
