const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const sequelize = require('./models').sequelize;
const spawn = require('child_process').spawn;

sequelize.sync();

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const {
    Pnu,
    Sequelize: { Op }
} = require('./models');
sequelize.query('SET NAMES utf8;');


app.get('/get/data/', (req, res) => {
    Pnu.findAll({
        order: [['date', 'DESC']],
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        throw err;
    })
})

app.get('/refresh', (req, res) => {
    console.log("Database refresing.....");
    const parse_result = spawn('python3', ['./python/main.py']);
    parse_result.stdout.on('data', (data) => {
        console.log(data.toString());
        console.log("Refreshing done.");
        res.json({ message: "1" });
    })
    
    // parse_result.stderr.on('data', (data_) => {
    //     res.json({ message: "0", data: data_ });
    // })
})