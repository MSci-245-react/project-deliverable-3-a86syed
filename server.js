import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM a86syed.User WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	let sql = "SELECT * FROM movies";
	let connection = mysql.createConnection(config); 

	connection.query(sql, (error, results) => { 
		if (error) { 
			return console.error(error.message);
		}
		res.send({express : JSON.stringify(results)});
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	let userID = req.body.userID;
    let movieID = req.body.movieID;
    let reviewTitle = req.body.reviewTitle;
    let reviewContent = req.body.reviewContent;
    let reviewScore = req.body.reviewScore;

    let sql = `INSERT INTO a86syed.Review(userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES (${userID}, ${movieID}, "${reviewTitle}", "${reviewContent}", ${reviewScore});`
    let connection = mysql.createConnection(config);

    connection.query(sql, (error, results) => {
        if (error) {
            res.send(error);
        }
        res.send({express: JSON.stringify(results)});
    });
    connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server