import React, { PureComponent } from 'react'
import { Button, Label, Form, FormGroup } from 'reactstrap'
import { connect } from 'react-redux'
import Container from './Container'
import { colors } from '../assets/sharedUI'
import {
  parseTweets,
  parseTweetsSuccess,
  analyzeSentiment,
  calculateSentiment
} from '../actions/tweetActions'

class TweetProcessor extends PureComponent {
  parseTweets = e => {
    e.preventDefault()
    const results = this.props.tweets.map(t => {
      return {
        id: t.id,
        words: t.full_text
          .split(' ')
          .map(wd => wd.replace(/[^0-9a-z]/gi, ''))
          .map(wd => wd.toLowerCase())
          .filter(word => !/[^a-z]#/i.test(word)),
        polarity: 0
      }
    })
    this.props.parseTweets(results)
    this.props.parseTweetsSuccess()
  } // const filteredWords = words.filter(word => !/[^a-z]/i.test(word));

  analyzeSentiment = e => {
    e.preventDefault()
    // console.log(this.props.tweetWords)
    this.props.analyzeSentiment(this.props.tweetWords)
  }

  calculateSentiment = e => {
    e.preventDefault()
    this.props.calculateSentiment(
      this.props.sentimentWords,
      this.props.tweetWords,
      this.props.tweets
    )
  }

  render() {
    return (
      <Container
        style={{
          backgroundColor: colors.green2,
          height: 'auto',
          width: '100%',
          flexDirection: 'column',
          margin: '1rem 0',
          padding: '8px'
        }}
      >
        <Label
          style={{
            fontSize: 18,
            textAlign: 'left',
            marginTop: '1rem',
            fontWeight: 600,
            display: 'block'
          }}
        >
          Process Tweets
        </Label>
        <Label style={{ fontSize: 16, display: 'block' }}>
          {this.props.tweets
            ? this.props.tweets.length + ' Tweet(s) Fetched'
            : 'No Tweets Fetched'}
        </Label>
        <Form onSubmit={this.parseTweets}>
          <Button
            color="dark"
            style={{ marginTop: '2rem' }}
            block
            disabled={!this.props.searched}
          >
            Parse Tweets
          </Button>
        </Form>
        <Form onSubmit={this.analyzeSentiment}>
          <Button
            color="dark"
            style={{ margin: '1rem 0' }}
            block
            disabled={!this.props.parsed}
          >
            Analyze Sentiment
          </Button>
        </Form>
        <Form onSubmit={this.calculateSentiment}>
          <Button
            color="dark"
            style={{ margin: '1rem 0' }}
            block
            disabled={!this.props.sentimentAnalyzed}
          >
            Calculate Sentiment
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  tweetWords: state.tweets.tweetWords,
  sentimentWords: state.tweets.sentimentWords,
  searched: state.tweets.searched,
  parsed: state.tweets.parsed,
  sentimentAnalyzed: state.tweets.sentimentAnalyzed
})

export default connect(
  mapStateToProps,
  { parseTweets, parseTweetsSuccess, analyzeSentiment, calculateSentiment }
)(TweetProcessor)
