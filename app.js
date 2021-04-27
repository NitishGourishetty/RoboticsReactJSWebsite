const Sequelize = require("sequelize"),
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser")
//Enter real passwrod in
const connection = new Sequelize('robotics_schema', 'root', 'password!', {
    dialect: 'mysql'
});
app.use(bodyParser.urlencoded({ extender: true }));
app.set("view engine", "ejs");

const Article = connection.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.STRING
}, {
    timestamps: false,
});

app.get("/", function (req, res) {
    res.render("graph_page")
});

app.listen(3000, function () {
    console.log("The YelpCamp Server has started");
});

connection
    .sync({
        force: true,
        logging: console.log
    })
    .then(function () {
        return Article.create({
            title: 'Graph 1',
            body: 12
        });
    })
    .catch(function (error) {
        console.log(error);
    });