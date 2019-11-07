const express = require('express');
const router = express.Router();
const Scores = require('../models/scores.js')

router.use(express.static('public'));


// INDEX
router.get('/', (req, res) => {
    Scores.find({}, (error, scores) => {
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs', {
            scores
            });
        }
    });
});


// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs')
})


// SHOW
router.get('/:id', (req, res) => {
    Scores.findById(req.params.id, (error, scores) => {
        if (error) {
            res.send(error)
        } else {
            res.render('show.ejs', {
            scores,
            id: req.params.id
            });
        }
    });
});


// EDIT
router.get('/:id/edit', (req, res)=>{
    Scores.findById(req.params.id, (error, scores) => {
        if (error) {
            console.log(error)
        } else {
            res.render('edit.ejs', {
                scores,
                id: req.params.id
            });
        }
    });
});


// CREATE
router.post('/', (req, res) => {
    Scores.create(req.body, (error, scores) => {
        if (error) {
            res.send(error)
        } else {
            res.redirect('/');
        }
    });
});


// UPDATE
router.put('/:id', (req, res)=>{
    Scores.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, scores)=>{
        if (error) {
            console.log(error)
        } else {
            res.redirect('/');
        }
    });
});


// DELETE
router.delete('/:id', (req, res)=>{
    // add delete logic using mongoose
    Scores.findByIdAndRemove(req.params.id, (error, scores) => {
        if (error) {
            console.log(error)
        } else {
            //redirect back to fruits index
            res.redirect('/');
        }
    });
});

module.exports = router;