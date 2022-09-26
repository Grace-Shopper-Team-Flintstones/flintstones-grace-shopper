const router = require('express').Router();
const { Order, Account} = require('../db');
const Sequelize = require('sequelize');


router.get('/orders', async (req, res, next) => {
    try {
        const account = await Account.byToken(req.headers.authorization);
        const order = await Order.findByPk()
    } catch (error) {
        next(error)
    }
})





module.exports = router;