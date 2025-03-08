const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const UserCtrl = require('../controllers/user');

// v7.0.0以降はコールバックが非推奨になったため、async/awaitを使用する
// router.get('', function(req, res) {
//     Product.find({}, function(err, products) {
//       res.json(products);
//     });
// });

router.get('/secret', UserCtrl.authMiddleware, async function(req, res) {
    return res.json({"secret": true});
});

router.get('', async function(req, res) {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return res.json({error: error})
  }
});

router.get('/:productId', UserCtrl.authMiddleware, async function(req, res) {
  try {
    const product = await Product.findById(req.params.productId);  
    return res.json(product);
  } catch (error) {
    return res.status(422).send({errors: [{title: 'Product error', detail: 'Product not found'}]});
  }
});

module.exports = router;