var mongoose = require('mongoose');

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

exports.get_landing = function (req, res, next) {
  res.render('landing', { title: 'Express' });
};

//get data from the view and send it to the database
exports.submit_lead = function (req, res, next) {
  let newRecord = email({ email: req.body.lead_email }).save(function (err) {
    if (err) throw err;
  });
  console.log('lead_email: ', req.body.lead_email); //we gonna access the value in the input element
  res.redirect('/leads');
};

//get data from mongo db and pass it to the view
exports.show_leads = function (req, res, next) {
  return email.find({}, function (err, data) {
    if (err) throw err;
    console.log(data);
    res.render('landing', { data: data });
  });
};
