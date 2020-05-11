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
  res.render('landing', { title: 'Express' }); //redirect to landing.pug view
};

//get data from the view and send it to the database
exports.submit_lead = function (req, res, next) {
  email({ email: req.body.lead_email }).save(function (err) {
    if (err) throw err;
  });
  res.redirect('/leads');
};
//we gonna access the value in the input element
//query for /leads route to landing page again and this routing evoke show_leads function

//get data from mongo db and pass it to the view
exports.show_leads = function (req, res, next) {
  return email.find({}, function (err, data) {
    if (err) throw err;
    res.render('landing', { data: data }); //routing landing page again by pasting data retreived
  });
};

//query a specific record whose id is = req.params.lead_id and pasting retreived data to lead page
exports.show_lead = function (req, res, next) {
  return email.find({ _id: req.params.lead_id }, function (err, data) {
    if (err) throw err;
    res.render('lead', { data: data });
  });
};

//Routing edit_lead view by a GET method with a req.params.lead_id identifier
exports.show_edit_lead = function (req, res, next) {
  return email.find({ _id: req.params.lead_id }, function (err, data) {
    if (err) throw err;
    res.render('edit_lead', { data: data });
  });
};

//updating DB and fetching new data according to unic Id.
exports.edit_lead = function (req, res, next) {
  let newvalues = { $set: { email: req.body.lead_email } };
  email.updateOne({ _id: req.params.lead_id }, newvalues, function (err, res) {
    if (err) throw err;
    console.log('1 document updated');
  });

  return email.find({ _id: req.params.lead_id }, function (err, data) {
    if (err) throw err;
    res.render('lead', { data: data });
  });
};

//deleting a record from DB and fetching new data.
//One Issue!! we must use async function becouse when we delete an item, page refreshing immediately and deleted item shown still on the page!!!
exports.delete_lead = function (req, res, next) {
  return email
    .deleteOne({ _id: req.params.lead_id }, function (err, res) {
      if (err) throw err;
      console.log('1 document deleted');
    })
    .then(result => {
      res.redirect('/leads');
    });
};
exports.delete_lead_json = function (req, res, next) {
  return email
    .deleteOne({ _id: req.params.lead_id }, function (err, res) {
      if (err) throw err;
      console.log('1 document deleted');
    })
    .then(result => {
      res.send({ msg: 'Success' });
    });
};
