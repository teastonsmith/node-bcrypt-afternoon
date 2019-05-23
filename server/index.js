require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const PORT = 4000;
app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authController');

massive(CONNECTION_STRING).then(database => {
	app.set('db', database);
	console.log('Database connected');
});

app.use(
	session({
		resave: true,
		saveUninitialized: false,
		secret: SESSION_SECRET,
	}),
);

app.post('/auth/register', authCtrl.register);

app.listen(PORT, () => {
	console.log(`Now listening on port: ${PORT}`);
});
