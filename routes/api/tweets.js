const express = require("express");
const router = express.Router();
const axios = require("axios");
const Word = require("../../models/Word");
const twitterToken = require("../../config/keys").twitterToken;

router.get(`/:qparams`, (req, res) => {
  axios
    .get(
      "https://api.twitter.com/1.1/search/tweets.json?q=" +
        encodeURIComponent(req.params.qparams) +
        "&lang=en&count=100&tweet_mode=extended&exclude=retweets",
      {
        withCredentials: false,
        headers: {
          Authorization: "Bearer " + twitterToken,
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
    .catch(err => console.log(err))
    .then(request => res.json(request.data));
});

async function lookupTweetWords(tweet) {
  const tweet_id = tweet.id;
  const result = Word.aggregate([
    { $match: { word: { $in: tweet.words } } },
    {
      $group: {
        _id: "$word",
        polarity: { $first: "$polarity" }
      }
    }
  ]).sort({ word: -1 });
  return result;
}

router.post(`/`, (req, res) => {
  const results = req.body.tweets.map(async t => {
    const id = t.id;
    return lookupTweetWords(t);
  });

  Promise.all(results).then(function(values) {
    let arr = [];
    values.map(function(val, index) {
      t_id = req.body.tweets[index].id;
      const obj = { t_id, val };
      arr.push(obj);
    });
    res.json(arr);
  });
});

module.exports = router;
