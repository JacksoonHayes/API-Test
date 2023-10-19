const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', SignIn)
app.get('/homepage', HomePage)
app.get('/signout', SignOut)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});