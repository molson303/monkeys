require('dotenv').config();

var express = require('express');
var router = express.Router();
var Queries = require('../lib/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  Queries.allMonkeys().then(function(monkeys){
    res.render('monkey/index', {
      title: 'Monkeys',
      monkeys: monkeys.rows
    })
  })
});

router.get('/new', function(req, res, next) {
  res.render('monkey/new');
})

router.post('/', function(req, res, next) {
  Queries.addMonkey(req.body).then(function() {
    Queries.addClothes(req.body).then(function(){
      res.redirect('/monkeys');
    })
  })
});

router.get('/:id/show', function(req, res, next) {
  Queries.showMonkey(req.params.id).then(function(monkey) {
    Queries.showClothes(req.params.id).then(function(clothes) {
      res.render('monkey/show', {
        monkey: monkey.rows[0],
        clothes: clothes.rows[0]
      })
    })
  })
});

router.get('/:id/edit', function(req, res, next) {
  Queries.showMonkey(req.params.id).then(function(monkey) {
    Queries.showClothes(req.params.id).then(function(clothes) {
      res.render('monkey/edit', {
        monkey: monkey.rows[0],
        clothes: clothes.rows[0]
      })
    })
  })
});

router.post('/:id', function(req, res) {
  Queries.editMonkey(req.body, req.params.id).then(function() {
    Queries.editClothes(req.body, req.params.id).then(function () {
      res.redirect('/monkeys/' + req.params.id + '/show')
    })
  })
});

router.get('/:id/delete', function(req, res) {
  Queries.deleteClothes(req.params.id).then(function() {
    Queries.deleteMonkey(req.params.id).then(function() {
      res.redirect('/monkeys')
    })
  })
});


module.exports = router;
