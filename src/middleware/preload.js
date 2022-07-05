//TODO replace with actual service
const cryptoService = require('../services/crypto');

//TODO change property name to match collection
function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        
        if (populate){
            //TODO change trip to actual collection
            res.locals.crypto = await cryptoService.getCryptoAndPopulate(id);
        } else {
            res.locals.crypto = await cryptoService.getCryptoById(id);
        }
        
        next();
    };
}

module.exports = preload;