const orderModel = require("../models/OrderModel");
const { requestToQuey } = require("../utils/requestUtils");

class OrderController {
  // [GET] /order
  async getAll(req, res) {
    let userId = req.userId;

    const orders = await orderModel.find({ userId });
    return res.status(200).json({
      data: orders,
    });
  }

  // [POST] /order/add
  async add(req, res) {
    try {
      let response = await orderModel.create(req.body);
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

module.exports = new OrderController();
