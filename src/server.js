// CONSTANT DECLARATIONS
const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const io = require("socket.io").listen(server);
const { compare, hash } = require("./scripts/bcrypt");
const db = require("./scripts/db");
const axios = require("axios");
const s3 = require("./scripts/s3.js");
const { s3Url } = require("./config");

// HANDLING SECRETS
let secrets;
if (process.env.NODE_ENV === "production") {
  secrets = process.env; // in prod the secrets are environment variables
} else {
  secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

// COMPRESSION MIDDLEWARE
app.use(compression());

// STATIC FILES
app.use(express.static(__dirname + "../public"));

// REQ.BODY ACCESSIBILITY
app.use(
  express.urlencoded({
    extended: false
  })
);

// COOKIES HANDLER
const cookieSessionMiddleware = cookieSession({
  secret: secrets.SESSION_SECRET,
  maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});
//
// // SERVE JSON
app.use(express.json());
//
// CSURF MIDDLEWARE
app.use(csurf());
app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  next();
});

/************** Multer - DO NOT TOUCH *********************/
const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 20971520
  }
});

axios.create({
  xsrfCookieName: "mytoken",
  xsrfHeaderName: "csrf-token"
});

/************** Multer - DO NOT TOUCH *********************/

/***********************************************************************/
// ROUTES
// GET - /getMap
// app.get("/getMap", (req, res) => {
//   const mapboxgl = require("mapbox-gl");
//   mapboxgl.accessToken =
//     "pk.eyJ1IjoiY2FtcG9kZWdlbG8iLCJhIjoiY2s2b3lpdDJwMDkzaTNrcW8weno3ZzljciJ9.ggdQUJLnLnWQ92IjWlFK5g";
//   const map = new mapboxgl.Map({
//     container: this.mapContainer,
//     // style: "mapbox://styles/mapbox/dark-v10",
//     // style: "mapbox://styles/campodegelo/ck6peiqju12nc1is9h04l2lg3",
//     style: "mapbox://styles/campodegelo/ck6pf5nj012wt1io6pt1i2cb9",
//     center: [0, 0],
//     zoom: 1
//   });
//   res.json({ map: map });
// });

// USER - GET
app.get("/user", (req, res) => {
  console.log('router /user reached');
  
  if (req.session && typeof req.session.userId !== "undefined") {
    db.getUserInfo(req.session.userId)
      .then(data => {
        console.log("user data from getUserInfo: ", data);
        res.json({
          success: true,
          data: data[0]});
      })
      .catch(err => console.log("err in getUserInfo: ", err));
  } else {
    console.log('user not found');
    
    res.json({ success: false });
  }
});

// REGISTER - POST
app.post("/register", (req, res) => {
  const { first, last, email, password, confirm } = req.body;
  console.log("Input to /register : ", req.body);
  // check for empty inputs
  if (!first || !last || !email || !password || !confirm) {
    // console.log("empty input");
    res.json({
      success: false
    });
  } else {
    // check if type pwd and the confirmation match
    if (!(password === confirm)) {
      res.json({
        success: false
      });
    } else {
      // check if email is already registered
      db.userExists(email).then(data => {
        if (data.length > 0) {
          console.log('user exists already');
          // user is already in the db
          res.json({
            success: false
          });
        } else {
          // hash the password
          hash(password).then(hashedPass => {
            // console.log("password hashed");
            db.insertNewUser(first, last, email, hashedPass)
              .then(data => {
                console.log('user has been inserted');
                // set a cookie for the new user
                req.session.userId = data[0].id;
                res.json({
                  success: true
                });
              })
              .catch(err => console.log("err in insertNewUser : ", err));
          });
        }
      });
    }
  }
});
// LOGIN - POST
app.post("/login", (req, res) => {
  console.log('/login route reached');
  
  db.userExists(req.body.email).then(data => {
    // if results array > 0, means the user was found in the db
    if (data.length > 0) {
      console.log('user found in the db');
      
      const userId = data[0].id;
      compare(req.body.password, data[0].password).then(data => {
        if (data) {
          // password is correct and cookie will be created
          console.log('password match');
          
          req.session.userId = userId;
          // res.redirect('/games');
          res.json({
            success: true
          });
        } else {
          // passwords do not match
          res.json({
            success: false
          });
        }
      });
    } else {
      // user is not registered
      res.json({
        success: false
      });
    }
  });
});

// LOGOUT - POST
app.post("/logout", (req, res) => {
  console.log("made it here ");
  req.session.userId = null;
  // delete req.session;
  console.log("after it here ");
  // res.redirect("/");
  res.json({
    success: true
  });

  // window.location.pathname = "/";
});

// UPLOAD - POST
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
  const imageUrl = s3Url + req.file.filename;
  if (req.file) {
      // Insert in the database
      db.updatePicture(req.session.userId, imageUrl)
          .then(data => {
              res.json(data);
          })
          .catch(err => console.log("err in updatePicture: ", err));
  }
});

// GET - Send back the information of all players
app.get('/allPlayers', (req, res) => {
  db.allPlayers().then(data => {
    console.log('users : ', data);
    res.json(data);
  }).catch(err => console.log('error in allPlayers', err));
});

// GET - Return if a tournament is still not finished
app.get('/findOnGoingTournament', (req, res) => {
  db.findOnGoingTournament().then(data => {
    console.log('tournament = ', data);
    res.json(data);
  }).catch(err => console.log('error in finding ongoing tournaments: ', err));
})

// POST - Create a new Tournament
app.post('/newTournament', (req, res) => {
  console.log('req.body = ', req.body);
  const {currentDate, value, playerId} = req.body;
  db.newTournament(currentDate, value).then(data => {
    console.log('data from newTournament = ', data);
    // res.json(data);

    db.joinPlayer(playerId, data[0].id).then(data => {
      console.log('data from joinPlayer = ', data);
      res.json(data);
    }).catch(err => console.log('error in adding players: ', err));
  }).catch(err => console.log('error in creating new tournament: ', err));
});

// POST - insert player into tournament
app.post('/joinPlayer',(req, res) => {
  console.log(req.body);
  const {playerId, tournamentId} = req.body;
  db.joinPlayer(playerId, tournamentId).then(data => {
    console.log('user inserted: ', data);
    res.json(data);
  }).catch(err => console.log('error in joinPlayer : ', err));
});

// POST - remove player from tournament 
app.post('/removePlayer', (req, res) => {
  
  const {playerId, tournamentId} = req.body;

  console.log("tournamentId ", tournamentId);

  db.removePlayer(playerId, tournamentId).then(data => {
    // if correct, checks if there is still players in the tournament
    db.searchPlayers(tournamentId).then(data => {
      console.log('data from searchPlayers = ', data);
      if (data.length === 0) {
        // remove tournament
        db.removeTournament(tournamentId).then(data => {
          res.json({
            delete: true
          });
        }).catch(err => console.log('error in removeTournament : ', err)); 
      } else {
        res.json(data);
      }
    }).catch(err => console.log('error in searchPlayers : ', err));
  }).catch(err => console.log('error in removePlayer : ', err));
});

// POST - search the inputs fro buyin and addon
app.post('/searchBA', (req, res) => {
  console.log('req.body = ', req.body);
  const {userId, tournamentId} = req.body;
  db.searchBA(userId, tournamentId).then(data => {
    console.log('results from searchBA = ', data);
    res.json(data);
  }).catch(err => console.log('err in searchBA: ', err));
});

// POST - insert new values for addon and rebuy
app.post('/increment', (req, res) => {
  console.log('values = ', req.body);
  const {userId, tournamentId} = req.body;
  const {buyin, addon, prize} = req.body.values;
  db.updateValues(userId, tournamentId, buyin, addon, prize).then(data => {
    console.log('data from updateValue ', data);
    res.json(data);
  }).catch(err => console.log('error in updateValues : ', err));
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Listening...");
});
