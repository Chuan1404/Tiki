const cartModel = require("../models/CartModel");

class CartController {
  // [GET] /cart
  async getAll(req, res) {
    const userId = req.userId;
    const limit = req.query.limit || 10;
    const page = req.query.page | 1;

    const carts = await cartModel
      .find({ userId })
      .populate("productObject")
      .limit(limit)
      .skip(limit * (page - 1));

    const count = await cartModel.countDocuments({ userId });
    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      totalPage,
      limit,
      page,
      data: carts,
    });
  }

  // [PUT] /cart/update/:id
  async update(req, res) {
    const userId = req.userId;
    const productId = req.params.id;
    const quantity = req.body.quantity;

    try {
      let cart = await cartModel.findOne({ userId, productId });
      let response = {};
      if (cart) {
        response = await cartModel.updateOne(
          { userId, productId },
          { quantity }
        );
      } else {
        response = await cartModel.create({ userId, productId, quantity });
      }

      res.json({
        data: response,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  }

  // [DELETE] /cart/delete/:id
  async delete(req, res) {
    const userId = req.userId;
    const productId = req.params.id;

    try {
      let response = await cartModel.deleteOne({ userId, productId });
      res.json({
        data: response,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  }
}

module.exports = new CartController();
