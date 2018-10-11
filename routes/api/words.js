const express = require("express");
const router = express.Router();
const axios = require("axios");

// Word Model
const Word = require("../../models/Word");

// @route   GET api/words
// @desc    Get All Words
// @access  Public
router.get("/", (req, res) => {
  Word.find()
    .sort({ date: -1 })
    .then(words => res.json(words));
});

// router.get("/tweets/", (req, res) => {
//   axios
//     .get("https://api.twitter.com/1.1/search/tweets.json?q=nasa", {
//       withCredentials: false,
//       headers: {
//         Authorization:
//           "Bearer AAAAAAAAAAAAAAAAAAAAAGxP8AAAAAAAvJnDQ9cWPccJf467p6K3fn4F4iU%3D1vV7jBIiIwv3DzlTgTlaKlTeG285SVwJuah9oP3nZrl2Aalzu4",
//         "Access-Control-Allow-Origin": "*"
//       }
//     })
//     .then(request => res.json(request.data));
// });

// @route   POST api/words
// @desc    Add a list of Words
// @access  Public
// router.post('/', (req, res) => {
//     Word.insertMany(req.body.words).then(words => res.json(words))
// })

module.exports = router;
