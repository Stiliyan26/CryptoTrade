const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const postController = require('../controllers/post');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(postController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found'});
    });
}