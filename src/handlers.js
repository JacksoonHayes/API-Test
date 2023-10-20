const jwt = require('jsonwebtoken');

// define the JWT keys and expiration time

const jwtKey = 'secret_key';
const jwtExpirySeconds = 300;

// define a user database including username and password

const users = {
    user1: 'password1',
    user2: 'password2',
    user3: 'password3'
}

const signIn = (req, res) => {

// gets credentials from json body
    const { username, password } = req.body;
    if (!username || !password || users[username] !== password) {

    // return a 401 error if username or password is not valid
    // or if password does not match the username
        return res.status(401).end();
    }

    const token = jwt.sign({ username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds,
    });
    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
    res.end();

    // obtain the session token from the requests cookie
    const access = (req, res) => {
        const token = req.cookies.token;

        // if the cookie is not set, return an unauthorized error
        if (!token) {
            return res.status(401).end();
        }

        var payload;
        try {
            payload = jwt.verify(token, jwtKey);
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError) {
                return res.status(401).end();
            }
            return res.status(400).end();
        }
        res.send(`Welcome to the secret page: ${payload.username}!`);
    }
};

const nowIssuedSeconds = Math.round(Number(new Date()) / 1000);
if (payload - nowIssuedSeconds > 30) {
    return res.status(401).end();
}

const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
});

res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 });

const logout = (req, res) => {
    res.clearCookie('token');
    res.end();
};