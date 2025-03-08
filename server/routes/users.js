const express = require("express");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

// v7.0.0以降はコールバックが非推奨になったため、async/awaitを使用する
// router.get('', function(req, res) {
//     User.find({}, function(err, users) {
//       res.json(users);
//     });
// });

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  // Eメール
  if (!email) {
    return res.status(422).send({
      errors: [{ title: "Eメール", detail: "Eメールを入力してください" }],
    });
  }

  // パスワード
  if (!password) {
    return res.status(422).send({
      errors: [{ title: "パスワード", detail: "パスワードを入力してください" }],
    });
  }

  try {
    const foundUser = await User.findOne({ email });

    //  存在していなければエラー
    if (!foundUser) {
      return res.status(422).send({
        errors: [{ title: "ログイン", detail: "Eメールが登録されていません" }],
      });
    }

    // パスワードが一致していなければエラー
    if (await !foundUser.hasSamePassword(password)) {
      return res.status(422).send({
        errors: [{ title: "ログイン", detail: "パスワードが一致していません" }],
      });
    }

    const token = jwt.sign(
      {
        userId: foundUser.id,
        username: foundUser.username,
      },
      config.SECRET,
      { expiresIn: "1h" }
    ); // 1時間  60 * 60 * 1000

    return res.json(token);
  } catch (error) {
    return res
      .status(422)
      .send({ errors: [{ title: "ログイン", detail: error }] });
  }
});

router.post("/:register", async function (req, res) {
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  const { username, email, password, confirmPassword } = req.body;

  // ユーザー
  if (!username) {
    return res.status(422).send({
      errors: [{ title: "ユーザー名", detail: "ユーザー名を入力してください" }],
    });
  }

  // Eメール
  if (!email) {
    return res.status(422).send({
      errors: [{ title: "Eメール", detail: "Eメールを入力してください" }],
    });
  }

  // パスワード
  if (!password) {
    return res.status(422).send({
      errors: [{ title: "パスワード", detail: "パスワードを入力してください" }],
    });
  }

  // パスワード（確認）
  if (password !== confirmPassword) {
    return res.status(422).send({
      errors: [{ title: "パスワード", detail: "パスワードが一致しません" }],
    });
  }

  try {
    const foundUser = await User.findOne({ email });

    //  存在していたらエラー
    if (foundUser) {
      return res.status(422).send({
        errors: [{ title: "更新", detail: "Eメールが既に登録されています" }],
      });
    }

    // 存在していなければ新規登録
    const user = new User({ username, email, password });
    try {
      user.save();
      return res.json({ register: true });
    } catch (error) {
      return res
        .status(422)
        .send({ errors: [{ title: "更新", detail: "登録に失敗しました" }] });
    }
  } catch (error) {
    return res.status(422).send({ errors: [{ title: "更新", detail: error }] });
  }
});

module.exports = router;
