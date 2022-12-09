// For this exercise we will be building a simple JSON API application where we will store a shopping list. You should use an array to store your items in the shopping list.

// Each item should be a JavaScript object with the keys of name, and price.

// Remember that since you are using an array for storage, this will be cleared each time the server restarts. Create a simple file called fakeDb.js which contains the following:

const express = require('express')
const app = express();
const appRoutes = requires('./routes/app-routes')
const ExpressError = require('./expressError')

app.use(express.json());
app.use('/items', appRoutes)

app.use(function(req, res, next) {
    return new ExpressError('not found', 404)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message
    })
})

module.exports = app;