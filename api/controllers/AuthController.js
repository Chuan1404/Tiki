const UserModel = require("../models/UserModel");
const RefreshTokenModel = require("../models/RefreshTokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  // [POST] /auth/register
  async register(req, res) {
    const body = req.body;

    const existedUser = await UserModel.findOne({ email: body.email });

    if (existedUser) {
      return res.status(409).json({
        error: "Account existed",
      });
    } else {
      const hashPassword = bcrypt.hashSync(body.password, 10);
      const model = new UserModel(req.body);
      model.password = hashPassword;

      let savedUser = await model.save();
      if (!savedUser) {
        return res.status(400).json({
          status: 400,
          error: "Create user fail!",
        });
      }

      const payload = {
        id: savedUser._id,
        email: savedUser.email,
      };

      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

      let accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: accessTokenLife,
      });
      let refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: refreshTokenLife,
      });

      RefreshTokenModel.create({
        token: refreshToken,
      });

      return res.status(200).json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    }
  }

  // [POST] /auth/login
  async login(req, res) {
    const body = req.body;
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
      return res.status(400).json({
        error: "Email or password incorrect !",
      });
    } else {
      const isValidPassword = bcrypt.compareSync(body.password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({
          error: "Email or password incorrect !",
        });
      } else {
        const payload = {
          id: user._id,
          email: user.email,
        };

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

        let accessToken = jwt.sign(payload, accessTokenSecret, {
          expiresIn: accessTokenLife,
        });
        let refreshToken = jwt.sign(payload, refreshTokenSecret, {
          expiresIn: refreshTokenLife,
        });

        RefreshTokenModel.create({
          token: refreshToken,
        });

        return res.status(200).json({
          data: {
            accessToken,
            refreshToken,
          },
        });
      }
    }
  }

  // [POST] /auth/refresh-token
  async refreshToken(req, res) {
    const token = req.body.refreshToken;
    let tokenModel = await RefreshTokenModel.findOne({ token });

    if (!tokenModel) {
      return res.status(401).json({
        error: "UnAuthorized",
      });
    }

    jwt.verify(
      tokenModel.token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, data) => {
        console.log(err);
        if (err) {
          await RefreshTokenModel.deleteOne({ token });

          return res.status(401).json({
            error: "UnAuthorized",
          });
        }
        const payload = {
          id: data.id,
          email: data.email,
        };

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        let accessToken = jwt.sign(payload, accessTokenSecret, {
          expiresIn: accessTokenLife,
        });

        return res.status(200).json({
          data: {
            accessToken,
            refreshToken: token,
          },
        });
      }
    );
  }
}

module.exports = new AuthController();