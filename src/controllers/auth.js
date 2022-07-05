const router = require('express').Router();
const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');
const { isGuest, isUser } = require('../middleware/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register' });
});

//TODO check form action, method, filed names
router.post('/register', isGuest(), async (req, res) => {
    try {
        //TODO check valid length
        if (req.body.password.trim().length < 4) {
            throw new Error('The password should be at least four characters long');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('The repeat password should be equal to the password');
        }

        const user = await register(req.body.username, req.body.email , req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements

    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('register', { title: 'Register', errors });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login' });
});

//TODO check form action, method, field names
router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements

    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('login', { title: 'Login', errors });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;