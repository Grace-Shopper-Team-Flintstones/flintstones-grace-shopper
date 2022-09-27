const router = require('express').Router();
// const productRouter = require('./products')

router.get('/', (req, res) => {
    res.send('hello')
})

router.use('/products', require('./products'))
router.use('/accounts', require('./accounts'))
router.use('/orders', require('./orders'))
router.use('/orderInfo', require('./orderInfo'))
router.use('/admin', require('./admin'))


router.use((req, res, next) => {
    const err = new Error('API route not found!');
    err.status = 404;
    next(err);
});

module.exports = router;