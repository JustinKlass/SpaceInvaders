const express = require('express');
const router = express.Router();
const Scores = require('../models/scores.js')

router.use(express.static('public'));


// PLAY
router.get('/play', (req, res) => {
    res.render('play.ejs');
});


// INDEX
router.get('/scores', (req, res) => {
    Scores.find({}, (error, scores) => {
        if (error) {
            res.send(error)
        } else {
            res.render('scores.ejs', {
            scores,
            });
        }
    }).sort({score: 'descending'}).limit(6);
});


// NEW
router.get('/scores/new', (req, res) => {
    res.render('new.ejs')
});


// EDIT
router.get('/scores/:id/edit', (req, res)=>{
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
router.post('/scores', (req, res) => {
    Scores.create(req.body, (error, scores) => {
        if (error) {
            res.send(error)
        } else {
            res.redirect('/scores');
        }
    });
});


// UPDATE
router.put('/scores/:id', (req, res)=>{
    Scores.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, scores)=>{
        if (error) {
            console.log(error)
        } else {
            res.redirect('/scores');
        }
    });
});


// DELETE
router.delete('/scores/:id', (req, res)=>{
    // add delete logic using mongoose
    Scores.findByIdAndRemove(req.params.id, (error, scores) => {
        if (error) {
            console.log(error)
        } else {
            //redirect back to fruits index
            res.redirect('/scores');
        }
    });
});


module.exports = router;