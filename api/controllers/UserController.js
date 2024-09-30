const UserModel = require("../models/UserModel");

class UserController {
 // [GET] /user/get-info
 async getInfo(req, res) {
    const id = req.userId;
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({
        error: "User doesn't exist",
      });
    } else {
      return res.status(200).json({
        data: user,
      });
    }
  }

}

module.exports = new UserController();
