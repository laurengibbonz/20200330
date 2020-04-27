const router = require('express').Router();
let Contact = require('../models/contact.model');

router.route('/').get((req, res) => {
    Contact.find()
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
    Contact.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').get((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newContact = new Contact(req.body);
  
    newContact.save()
      .then(() => res.json('Contact added!!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;