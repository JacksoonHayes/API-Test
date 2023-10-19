const jwt = require('jsonwebtoken');

// define the JWT keys and expiration time

const jwtKey = 'secret_key';
const jwtExpirySeconds = 300;

// define a user database including username and password

const signIn = (req, res) => {
// gets credentials from json body
    const { username, password } = req.body;
    if (!username || !password || users[username] !== password) {
        return res.status(401).end();
    }
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds,
    });
    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
    res.end();

};