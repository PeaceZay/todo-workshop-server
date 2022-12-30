const express = require("express");
const app = express();

const pool = require("./sql/connection");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "hello universe!"})
})

// Get list of users
app.get('/users', (req, res) => {
    pool.query("SELECT * FROM users", function (err, rows, fields) {
        // Connection is automatically released when query resolves
        res.json(rows)
    });
});

// Get user by id
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    pool.query(`SELECT * FROM users WHERE id = ${id}`, function (err, rows, fields) {
        res.json(rows)
    });
});

//Post -
app.post('/users', (req, res) => {
   console.log(req.body)
    pool.query(
        `INSERT INTO users (id, name, email, password) VALUES (?,?,?,?)`, 
        [null, req.body.name, req.body.email, req.body.password],
        function (err, row, fields) {
        res.json(row)
    });
});
app.listen(PORT, () => console.log(`Listening @ https://localhost:5000: ${PORT}`));