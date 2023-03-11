const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const sequelize = require('./models').sequelize;

sequelize.sync();

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const {
    Cse,
    Sequelize: { Op }
} = require('./models');
sequelize.query('SET NAMES utf8;');

app.post('/add/data', (req, res) => {
    console.log(req.body);

    Cse.create({
        index: req.body.index,
        title: req.body.title,
        link: req.body.link,
        date: req.body.date
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
});

app.get('/get/data', (req, res) => {
    Cse.findAll()
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        throw err;
    })
});