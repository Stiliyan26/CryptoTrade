const express = require('express');
const { create: handlebars } = require('express-handlebars');
const session = require('express-session');
const userSession = require('../middleware/userSession');

module.exports = (app) => {
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }).engine);
    app.set('view engine', '.hbs');
    //TODO change the static folder to style if resources has styles not static.
    app.use('/static', express.static('static'));
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: 'auto'
        }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(userSession());
};