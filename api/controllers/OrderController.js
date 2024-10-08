const orderModel = require("../models/OrderModel");
const { paginate } = require("../utils/pagination");

class OrderController {
  // [GET] /order
  async getAll(req, res) {
    try {
      let userId = req.userId;
      const query = { userId };
      const options = {
        limit: req.query.limit,
        page: req.query.page,
      };

      const response = await paginate(orderModel, query, options);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }

  // [POST] /order/add
  async add(req, res) {
    try {
      let response = await orderModel.create(req.body);
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

module.exports = new OrderController();
