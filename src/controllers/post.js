const router = require('express').Router();
const mapErrors = require('../util/mappers');
const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createCrypto, updateCrypto, deleteCripto, buyCripto } = require('../services/crypto');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const crypto = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        paymentType: req.body.paymentType,
        owner: userId
    }

    const payment = crypto.paymentType;

    if (payment == 'crypto-wallet'){
        crypto.isWallet = true;
    } else if (payment == 'credit-card'){
        crypto.isCreditCard = true;
    } else if (payment == 'debit-card'){
        crypto.isDebitCard = true;
    } else if (payment == 'paypal'){
        crypto.isPaypal = true;
    }

    try {
        await createCrypto(crypto);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data: crypto, errors });
    }
});


router.get('/edit/:id', preload(false), isOwner(), (req, res) => {
    const crypto = res.locals.crypto;
    
    const payment = crypto.paymentType;

    if (payment == 'crypto-wallet'){
        crypto.isWallet = true;
    } else if (payment == 'credit-card'){
        crypto.isCreditCard = true;
    } else if (payment == 'debit-card'){
        crypto.isDebitCard = true;
    } else if (payment == 'paypal'){
        crypto.isPaypal = true;
    }
    
    res.render('edit', { title: 'Edit', data: crypto });
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    const id = req.params.id;

    const crypto = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        paymentType: req.body.paymentType,
    };

    const payment = crypto.paymentType;

    if (payment == 'crypto-wallet'){
        crypto.isWallet = true;
    } else if (payment == 'credit-card'){
        crypto.isCreditCard = true;
    } else if (payment == 'debit-card'){
        crypto.isDebitCard = true;
    } else if (payment == 'paypal'){
        crypto.isPaypal = true;
    }

    try {
        await updateCrypto(id, crypto);
        res.redirect(`/catalog/${id}`);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        crypto._id = id;
        res.render('edit', { title: 'Edit', data: crypto, errors });
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    await deleteCripto(req.params.id);
    res.redirect('/catalog');
});

router.get('/buy/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const userId = req.session.user._id

    try {
        await buyCripto(id, userId);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect(`/catalog/${id}`);
    }
});

module.exports = router;