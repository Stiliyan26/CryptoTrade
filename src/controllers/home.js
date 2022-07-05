const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllCrypto, getByName, geyByPayment } = require('../services/crypto');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const crypto = await getAllCrypto();
    res.render('home', { title: 'Home page', crypto })
});

router.get('/catalog', async (req, res) => {
    const crypto = await getAllCrypto();
    res.render('catalog', { title: 'Catalog', crypto });
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const crypto = res.locals.crypto;
    if (req.session.user) {
        crypto.isUser = true,
            crypto.isOwner = crypto.owner._id == req.session.user._id;

        if (crypto.cryptoUsers.some(u => u._id == req.session.user._id)) {
            crypto.hasBought = true;
        }
    }

    res.render('details', { title: 'Details', crypto });
});

router.get('/search', isUser(), async (req, res) => {
    const allCrypt = await getAllCrypto();
    res.render('search', { title: 'Search', cryptos: allCrypt });
});

router.post('/search', isUser(), async (req, res) => {
    const name = req.body.name;
    const paymentType = req.body.paymentType;

    const options = {
        name: { $regex: new RegExp(name, "i") },
        paymentType: paymentType
    };

    const selected = await getByName(options);

    res.render('search', { title: 'Search', cryptos: selected });
})


module.exports = router;