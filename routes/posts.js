//CRUD 구현
let express = require('express');
let router = express.Router();
let Post = require('../models/Post');

//Index
router.get('/', function(req, res) {
    Post.find({})
    .sort('-createdAt')
    .exec(function(err, posts) {
        if(err) return res.json(err);
        res.render('posts/index', {posts:posts});
    });
});

//New
router.get('/new', function(req, res) {
    res.render('posts/new');
});

//Create
router.post('/', function(req, res) {
    Post.create(req.body, function(err, post) {
        if(err) return res.json(err);
        res.redirect('/posts');
    });
});

//Show
router.get('/:id', function(req, res) {
    Post.findOne({_id:req.params.id}, function(err, post) {
        if (err) return res.json(err);
        res.render('posts/show', {post:post});
    });
});

//Edit
router.get('/:id/edit', function(req, res) {
    Post.findOne({_id:req.params.id}, function(err, post) {
        if (err) return res.json(err);
        res.render('posts/edit', {post:post});
    });
});

// update
router.put('/:id', function(req, res) {
    req.body.updatedAt = Date.now();
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post) {
        if (err) return res.json(err);
        res.redirect("/posts/" + req.params.id);
    });
});

// delete
router.delete('/:id', function(req, res) {
    Post.deleteOne({_id:req.params.id}, function(err) {
        if (err) return res.json(err);
        res.redirect('/posts');
    });
});

module.exports = router;