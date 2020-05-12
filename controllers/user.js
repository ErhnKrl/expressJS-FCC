//I'can't go on it is enough
//https://www.youtube.com/watch?v=G8uL0lFFoN0 01:40:00
var mongoose = require('mongoose');

//connect to the database
mongoose.connect(
  'mongodb+srv://erhan:21210Mak*@cluster0-wycgf.mongodb.net/FCCNodeJS?retryWrites=true&w=majority'
);

//create a scema
let userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//create a model
let users = mongoose.model('users', userSchema);

//These two methods for getting empty pages for login and signup
exports.show_login = function (req, res, next) {
  res.render('user/login', { formatData: {}, errors: {} });
};
exports.show_signup = function (req, res, next) {
  res.render('user/signup', { formatData: {}, errors: {} });
};
