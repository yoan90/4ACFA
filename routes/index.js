var express = require('express');
var router = express.Router();
const panier= []


const user = [{
  email: '',
  password: '',
  date: ''
}, {
  email: '',
  password: '',
  date: ''
}]
// user
router.get('/user', (req, res) => {
  res.json(user)
})
router.post('/user', (req, res) => {
  user.push({
  email: req.body.email,
  password: req.body.password,
  date: req.body.date
  })
  res.send('OK')
})
// panier
router.get('/panier', (req, res) => {
  res.json(panier)
})
router.post('/panier', (req, res) => {
  panier.push({
  nomProduit: req.body.nomProduit,
  prixProduit: req.body.prixProduit,
  quantity: req.body.quantity,
  idUser: req.body.idUser

  })
  res.send('add')
})

router.delete('/panier', (req, res) => {
panier.splice(req.body.index,1)
  res.send('deleted')
})

module.exports = router
