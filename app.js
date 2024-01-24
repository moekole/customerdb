var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());

app.post('/api/user', (req, res) => {
    // Extract data from the request body
    const { id, fullname, email, password } = req.body;



    // Check if all required fields are present
    if (!id || !fullname || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process the data (you can save it to a database, for example)
    // For simplicity, we'll just log the data in this example
    console.log('Received data:', { id, fullname, password });

    // Send a response
    res.json({ message: 'Data received successfully' });

    db.query("INSERT INTO customer (customerid, fullname, email, password) VALUES ($1,$2,$3,$4)",
        [id,fullname,email,password], (err, result) =>{
        if (err)
        {
            throw err;
        }

    })
});


app.get('/customer', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM customer');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
