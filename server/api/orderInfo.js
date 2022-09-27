const router = require('express').Router();
const Account = require('../db/Account');
const Product = require('../db/Product');

router.get('/:id', async(req, res, next) => {
    try{
        const account = await Account.findOne({
            where: {
                id: req.params.id,
            },
            include: [Product],
        });
        res.send(account);
    }catch(error){
        next(error);
    }
});

router.get('/', async(req, res, next) => {
    try{
        const account = await Account.findAll();
        res.send(account);
    }catch(error){
        next(error);
    }
});


module.exports = router;