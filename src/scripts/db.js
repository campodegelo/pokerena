// IMPORT POSTGRESQL
const spicedPg = require("spiced-pg");
const db = spicedPg(
  process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/pokerena"
);

// QUERIES
/***********************************************************************/
// SELECT INFORMATION ABOUT USER
exports.getUserInfo = id => {
  return db
    .query(
      `SELECT id, first, last, image FROM users
            WHERE id=$1`,
      [id]
    )
    .then(({ rows }) => rows);
};
// INSERT a new user in the table users
exports.insertNewUser = (first, last, email, password) => {
  return db
    .query(
      `INSERT INTO users (first, last, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
      [first, last, email, password]
    )
    .then(({ rows }) => rows);
};
// if user is already registered, it will return its password to be compared
exports.userExists = emailToCheck => {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [emailToCheck])
    .then(({ rows }) => rows);
};
// UPDATE PICTURE
exports.updatePicture = (id, imageUrl) => {
  return db
      .query(
          `UPDATE users
          SET image=$2
          WHERE id=$1
          RETURNING image`,
          [id, imageUrl]
      )
      .then(({ rows }) => rows);
};

// Return all the information of the registered players
exports.allPlayers = () => {
  return db.query(`SELECT * from users`).then(({rows})=> rows);
}

// Get a tournament that was not finished
exports.findOnGoingTournament = () => {
  return db.query(`
    SELECT player_id as id, buyin, addon, date_tournament, tournament_id, value_entry 
    FROM tournaments
    JOIN ranking
    ON tournaments.id = ranking.tournament_id
    WHERE tournaments.finished = false`
    ).then(({rows}) => rows);
};

// Insert a new tournament in the DB
exports.newTournament = (date, value) => {
  return db.query(`
    INSERT INTO tournaments (date_tournament, value_entry)
    VALUES ($1, $2)
    RETURNING id`,
    [date, value]
    ).then(({rows}) => rows);
};

// Finishes a tournaments
exports.finishTournament = (id) => {
  return db.query(`
    UPDATE tournaments
    SET finished = true
    WHERE id = $1
    RETURNING id`,
    [id]
    ).then(({rows})=>rows);
};

// INSERT player in Tournament
exports.joinPlayer = (idPlayer, idTournament) => {
  return db.query(`
    INSERT INTO ranking (player_id, tournament_id)
    VALUES ($1, $2)
    RETURNING tournament_id`,
    [idPlayer, idTournament]
    ).then(({rows}) => rows);
};

// Remove player from the table
exports.removePlayer = (idPlayer, idTournament) => {
  return db.query(`
    DELETE FROM ranking
    WHERE player_id = $1 AND tournament_id = $2
  `,[idPlayer, idTournament]).then(({rows}) => rows);
};

// Remove tournament 
exports.removeTournament = (idTournament) => {
  return db.query(`
    DELETE FROM tournaments
    WHERE id = $1
  `,[idTournament]).then(({rows}) => rows);
};

// Search for players registered in a tournament 
exports.searchPlayers = (idTournament) => {
  return db.query(
    `SELECT * FROM ranking
    WHERE tournament_id = $1`,
    [idTournament]).then(({rows}) => rows);
}

// search for buyin and addon for an user
exports.searchBA = (userId, tournamentId) => {
  return db.query(`
    SELECT * FROM ranking
    WHERE player_id = $1 AND tournament_id = $2
  `,[userId, tournamentId]).then(({rows}) => rows);
}

// update the values for the buyin and addon
exports.updateValues = (userId, tournamentId, buyin, addon, prize) => {
  return db.query(`
    UPDATE ranking
    SET buyin = $3,
        addon = $4,
        prize = $5
    WHERE player_id = $1 AND tournament_id = $2
    RETURNING player_id
  `,[userId, tournamentId, buyin, addon, prize]).then((rows) => rows);
}