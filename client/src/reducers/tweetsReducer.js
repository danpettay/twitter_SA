import {
  FETCH_TWEETS,
  FETCH_TWEETS_SUCCESS,
  TWEETS_LOADING,
  SENTIMENT_LOADING,
  PARSE_TWEETS,
  PARSE_TWEETS_SUCCESS,
  ANALYZE_SENTIMENT,
  ANALYZE_SENTIMENT_SUCCESS,
  UPDATE_POLARITY,
  ADD_TWEET_FINAL_FORM
} from '../actions/constants'

const initialState = {
  tweets: [],
  tweetWords: [],
  sentimentWords: [],
  finalTweets: [],
  tweetsLoading: false,
  sentimentLoading: false,
  error: false,
  searched: false,
  parsed: false,
  sentimentAnalyzed: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TWEETS_SUCCESS:
      console.log(FETCH_TWEETS_SUCCESS)
      return {
        ...state,
        tweetsLoading: false,
        error: false,
        searched: true,
        tweets: [...state.tweets, ...action.payload]
      }
    case TWEETS_LOADING:
      return {
        ...state,
        tweetsLoading: true
      }

    case PARSE_TWEETS:
      console.log(action.payload)
      return {
        ...state,
        tweetWords: [...state.tweetWords, ...action.payload]
      }
    case PARSE_TWEETS_SUCCESS:
      return {
        ...state,
        parsed: true
      }
    case ANALYZE_SENTIMENT:
      return {
        ...state,
        sentimentLoading: true
      }
    case ANALYZE_SENTIMENT_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        sentimentLoading: false,
        sentimentAnalyzed: true,
        sentimentWords: [...state.sentimentWords, ...action.payload]
      }
    case ADD_TWEET_FINAL_FORM:
      console.log(action.payload)
      return {
        ...state,
        finalTweets: [...state.finalTweets, action.payload]
      }
    default:
      return state
  }
}
