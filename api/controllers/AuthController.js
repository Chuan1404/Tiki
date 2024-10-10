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
      res.status(409).json({
        error: "Account existed",
      });
    } else {
      const hashPassword = bcrypt.hashSync(body.password, 10);
      const model = new UserModel(req.body);
      model.password = hashPassword;

      let savedUser = await model.save();
      if (!savedUser) {
        res.status(400).json({
          status: 400,
          error: "Create user fail!",
        });
        return;
      }

      const payload = {
        id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
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

      res.status(200).json({
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
    const user = await UserModel.findOne({ email: body.email, role: body.role });
    if (!user) {
      res.status(400).json({
        error: "Email or password incorrect !",
      });
    } else {
      const isValidPassword = bcrypt.compareSync(body.password, user.password);

      if (!isValidPassword) {
        res.status(400).json({
          error: "Email or password incorrect !",
        });
      } else {
        const payload = {
          id: user._id,
          email: user.email,
          role: user.role,
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

        res.status(200).json({
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
      res.status(401).json({
        error: "UnAuthorized",
      });
      return
    }

    jwt.verify(
      tokenModel.token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, data) => {
        if (err) {
          await RefreshTokenModel.deleteOne({ token });

          res.status(401).json({
            error: "UnAuthorized",
          });
          return;
        }
        const payload = {
          id: data.id,
          email: data.email,
          role: data.role,
        };

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        let accessToken = jwt.sign(payload, accessTokenSecret, {
          expiresIn: accessTokenLife,
        });

        res.status(200).json({
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
