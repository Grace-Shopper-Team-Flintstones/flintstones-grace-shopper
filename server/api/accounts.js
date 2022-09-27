const router = require('express').Router();

const Account = require('../db/Account');
const { isAdmin, requireToken } = require('./gateKeeper');

router.get('/',requireToken, isAdmin, async (req, res, next) => {
    try {
        const accounts = await Account.findAll();
        res.send(accounts);
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        req.body.isAdmin = false;
        const account = await Account.create(req.body)
        console.log('ACCOUNT API', account);
        res.send(account);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
      const deleteAccount = await Account.findByPk(req.params.id);
      deleteAccount.destroy();
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });

router.put('/:id', requireToken, async(req, res, next) => {
    try{
        const account = await Account.findByPk(req.account.id);
        await account.update(req.body);
        res.send(account);
    }catch(error){
        next(error);
    }
});

module.exports = router;