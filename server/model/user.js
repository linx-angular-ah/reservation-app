const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsersSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    max: [30, 'ユーザー名は最大30文字までです'] 
  },
  email: { 
    type: String, 
    required: true,
    max: [60, 'Eメールは最大60文字までです'] 
  },
  password: { 
    type: String, 
    required: true, 
    lowercase: true,
    min:[6, 'パスワードは6文字以上で入力してください'], 
    max: [20, 'パスワードは最大20文字までです'] 
  },
});

// bcrypt.hashは時間がかかる為、非同期処理としてコントロールする必要があるため
// async awaitをつける
// hash後にhash化したパスワードをデータベース等に保存する処理を書くことが多いが
// その場合async awaitをつけないとハッシュ化が終わる前に次の保存処理を実行してしまうため
// passwordがみつからないエラーが出る。
// bcryptにはhashSyncというメソッドも用意されているため
// これを使ってもasync await同様の同期的な動きを取る。
// が、どこかで非推奨？という情報もあるため、非同期処理を使うことが推奨されている。
UsersSchema.methods.hasSamePassword = async function(requestedPassword) {
  const user = this;
  return await bcrypt.compare(requestedPassword, user.password);  
}

UsersSchema.pre('save', async function(next) {
  const user = this;
  const saltRounds = 10;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
  // bcrypt.genSalt(saltRounds, async function(err, salt) {
  //   bcrypt.hash(user.password, salt, function(err, hash) {
  //     // if(err) return next(err);
  //     user.password = hash;
  //     next();
  //   });
  // });
});

module.exports = mongoose.model('User', UsersSchema);