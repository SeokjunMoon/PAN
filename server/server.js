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


app.get('/get/data', (req, res) => {
    Cse.findAll()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        throw err;
    })
});