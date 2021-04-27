//const http = require('http');
const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const connection = new Sequelize('robotics_schema', 'root', 'password!', {
	dialect: 'mysql'
});

let dataset = {};

// connection
// 	.sync({
// 		logging: console.log
// 	})
// 	.then(function() {
// 		Article.findAll().then(function(articles) {
// 			dataset = articles;
// 		})
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	});

//const server = http.createServer((req, res) => {
		const Article = connection.define('article', {
			data: Sequelize.INTEGER,
			graph: Sequelize.STRING,
			num1: Sequelize.INTEGER,
			num2: Sequelize.INTEGER,
			num3: Sequelize.INTEGER

	}, {
		timestamps: false
	});

    //Sending a JSON of the SQL stuff to port 8000, to get read my app.s in my-app later
	app.get("/", (req, res) => {
		//res.send(JSON.stringify(['Objects', 'Antoehr', '17']));
		console.log("Hitting");
		res.header("Access-Control-Allow-Origin", "*");
    	res.header("Access-Control-Allow-Headers", "X-Requested-With");
    	res.set("Access-Control-Allow-Origin", "*");
    	Article.findAll().then(function(articles) {
			dataset = articles;
			console.log(dataset);
			res.json({
			//parse it here
        	data: (dataset)
		})
		
    });
	});

	//console.log(Article.findAll());

	

	// if(req.url === '/') {
	// 	res.write('Hello World');
	// 	res.end();
	// }

	// if(req.url === '/hi') {
	// 	res.write(JSON.stringify([1, 2, 3]));
	// 	res.end();
	// }
//});

//const Article = connection.define('article', )


//server.listen(3000);

app.listen(8000,() =>{
	console.log("The  Server has started");
});
