const cartModel = require("../models/CartModel");

class CartController {
  // [GET] /cart
  async getAll(req, res) {
    const userId = req.userId;

    const carts = await cartModel.find({ userId });
    return res.status(200).json({
      data: carts,
    });
  }

  // [PUT] /cart/update/:id
  async update(req, res) {
    const userId = req.userId;
    const productId = req.body.id;
    const quantity = req.body.quantity;

    try {
      let cart = await cartModel.findOne({ userId, productId });

      let response = {};
      if (cart) {
        response = cartModel.updateOne({ userId, productId }, { quantity });
      } else {
        response = cartModel.create({ userId, productId, quantity });
      }
      return res.json({
        data: response,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  }

  // [DELETE] /cart/delete/:id
  async delete(req, res) {
    const userId = req.userId;
    const productId = req.body.id;

    try {
      let response = await cartModel.deleteOne({ userId, productId });
      return res.json({
        data: response,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  }
}

module.exports = new CartController();
