const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const authentication = require('../middleware/auth');

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  User.create({ email, password })
  .then(user => {
    res.status(201).json({data: { id: user.id, email: user.email }});
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  User.findAll({ where: { email } })
  .then(user => {
    if (email && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({data: user})
    }
    else {
      throw {

      }
    }
  })
})

router.use(authentication);

router.get('/photos', (req, res) => {

})

module.exports = router;