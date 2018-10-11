import axios from 'axios'
import {
  FETCH_TWEETS_SUCCESS,
  TWEETS_LOADING,
  PARSE_TWEETS,
  PARSE_TWEETS_SUCCESS,
  ANALYZE_SENTIMENT,
  ANALYZE_SENTIMENT_SUCCESS,
  ADD_TWEET_FINAL_FORM
} from './constants'

export const getTweets = qparams => dispatch => {
  dispatch(setTweetsLoading())
  axios
    // .get(url, {
    //   withCredentials: false,
    //   headers: {
    //     Authorization: 'Bearer ' + TWITTER_BEARER_TOKEN,
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    .get(`http://localhost:3000/api/tweets/${qparams}`)
    .then(res => {
      // console.log(res.data.statuses)
      dispatch(getTweetsSuccess(res.data.statuses))
    })
}

export const setTweetsLoading = () => {
  return {
    type: TWEETS_LOADING
  }
}

export const getTweetsSuccess = tweets => {
  console.log(tweets)
  return {
    type: FETCH_TWEETS_SUCCESS,
    payload: tweets
  }
}

export const parseTweets = words => {
  return {
    type: PARSE_TWEETS,
    payload: words
  }
}

export const parseTweetsSuccess = () => {
  return {
    type: PARSE_TWEETS_SUCCESS
  }
}

export const analyzeSentiment = tweets => dispatch => {
  dispatch({
    type: ANALYZE_SENTIMENT
  })
  axios
    .post('http://localhost:3000/api/tweets/', {
      tweets: tweets
    })
    .then(res =>
      dispatch({
        type: ANALYZE_SENTIMENT_SUCCESS,
        payload: res.data
      })
    )
}

export const calculateSentiment = (
  sentimentWords,
  tweetWords,
  tweets
) => dispatch => {
  sentimentWords.map(function(w) {
    //w = {id, [words_with_polarity]}
    const fullTweet = tweets.find(t => t.id === w.t_id) //the full tweet in question
    const parsedTweet = tweetWords.find(t => t.id === w.t_id) //the parsed tweet in question
    console.log(fullTweet)
    console.log(parsedTweet)

    if (w.val.length > 0) {
      //does the tweet have words with polarity?
      let pw_list = []
      w.val.map(function(wd) {
        let occurrance = parsedTweet.words.reduce(function(acc = 0, curr) {
          if (wd._id === curr) {
            return ++acc
          } else {
            console.log(acc)
          }
          return acc
        }, 0)
        console.log(wd._id + ':' + wd.polarity + ':' + occurrance)
        pw_list = [
          ...pw_list,
          { word: wd._id, polarity: wd.polarity, count: occurrance }
        ]
      })

      const total_polarity = pw_list.reduce(function(acc = 0, curr) {
        if (curr.polarity === 'positive') {
          return ++acc
        } else if (curr.polarity === 'negative') {
          return --acc
        } else {
          return acc
        }
      }, 0)

      dispatch({
        type: ADD_TWEET_FINAL_FORM,
        payload: {
          id: fullTweet.id_str,
          created_at: fullTweet.created_at,
          text: fullTweet.full_text,
          polar_words: pw_list,
          polarity: total_polarity
        }
      })
    } else {
      dispatch({
        type: ADD_TWEET_FINAL_FORM,
        payload: {
          id: fullTweet.id_str,
          created_at: fullTweet.created_at,
          text: fullTweet.full_text,
          polar_words: null,
          polarity: 0
        }
      })
    }
  })
}
