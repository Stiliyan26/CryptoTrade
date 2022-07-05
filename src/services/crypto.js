const Crypto = require('../models/Crypto');

async function createCrypto(cryp) {
    const result = new Crypto(cryp);
    await result.save();
}

async function getAllCrypto() {
    return await Crypto.find({}).lean();
}

async function getCryptoAndPopulate(id) {
    return await Crypto.findById(id).populate('owner').lean();
}

async function getCryptoById(id) {
    return await Crypto.findById(id).lean();
}

async function updateCrypto(id, cryp) {
    const existing = await Crypto.findById(id);

    existing.name = cryp.name;
    existing.image = cryp.image;
    existing.price = cryp.price;
    existing.description = cryp.description;
    existing.paymentType = cryp.paymentType;

    await existing.save();
}

async function deleteCripto(id){
    await Crypto.findByIdAndDelete(id);
}

async function buyCripto(id, userId){
    const cryp = await Crypto.findById(id);

    if (cryp.cryptoUsers.includes(userId)){
        throw new Error('You already bought these crypto coins.');
    }

    cryp.cryptoUsers.push(userId);
    await cryp.save();
}

async function getByName(options){
    const result = await Crypto.find(options).lean();

    return result;
}

async function geyByPayment(payment){
    return await Crypto.find({payment});
}

module.exports = {
    createCrypto,
    getAllCrypto,
    getCryptoAndPopulate,
    getCryptoById,
    updateCrypto,
    deleteCripto,
    buyCripto,
    getByName,
    geyByPayment
}