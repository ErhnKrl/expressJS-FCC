var mongoose = require('mongoose');

exports.get_landing = function (req, res, next) {
  res.render('landing', { title: 'Express' });
};

exports.submit_lead = function (req, res, next) {
  console.log('lead_email: ', req.body.lead_email); //we gonna access the value in the input element
  res.redirect('/');
};

//connect to the database
mongoose.connect(
  'mongodb+srv://erhan:21210Mak*@cluster0-wycgf.mongodb.net/FCCNodeJS?retryWrites=true&w=majority'
);

//create a scema
var emailSchema = new mongoose.Schema({
  email: String,
});

//create a model
var email = mongoose.model('emails', emailSchema);

var itemOne = email({ email: 'deneme3@gmail.com' }).save(function (err) {
  if (err) throw err;
  console.log('item saved');
});
