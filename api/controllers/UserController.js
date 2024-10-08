const userModel = require("../models/UserModel");

class UserController {
  // [GET] /user
  async getAll(req, res) {
    const limit = req.query.limit || 10;
    const page = req.query.page | 1;

    const users = await userModel
      .find()
      .limit(limit)
      .skip(limit * (page - 1));

    const count = await userModel.countDocuments();
    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      totalPage,
      limit,
      page,
      data: users,
    });
  }

  // [GET] /user/get-info
  async getInfo(req, res) {
    const id = req.userId;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      res.status(400).json({
        error: "User doesn't exist",
      });
    } else {
      res.status(200).json({
        data: user,
      });
    }
  }
}

module.exports = new UserController();
