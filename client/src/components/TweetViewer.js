import React, { PureComponent } from 'react'
import { Label } from 'reactstrap'
import { connect } from 'react-redux'
import Container from './Container'
import Tweet from './Tweet'
import { colors } from '../assets/sharedUI'
import { TweetDateTime } from '../assets/utils/DateTime'

class TweetViewer extends PureComponent {
  render() {
    return (
      <Container
        style={{
          backgroundColor: colors.green3,
          height: 'auto',
          width: '100%',
          flexDirection: 'column',
          alignSelf: 'flexStart',
          margin: '1rem 0',
          padding: '8px'
        }}
      >
        <Label
          style={{
            fontSize: 18,
            textAlign: 'center',
            margin: '1rem 0',
            fontWeight: 600
          }}
        >
          Fetched Tweets
        </Label>
        <Tweet
          key={1}
          createdAt={'Created At'}
          content={'Tweet'}
          polarity={'Polarity'}
          posWords={['Pos Words']}
          negWords={['Neg Words']}
        />
        {this.props.sentimentLoading
          ? ' Loading...'
          : this.props.finalTweets.map(function(t) {
              let pos_words = []
              let neg_words = []
              t.polar_words
                ? t.polar_words.map(function(w) {
                    if (w.polarity === 'positive') {
                      pos_words = [...pos_words, w.word]
                    } else if (w.polarity === 'negative') {
                      neg_words = [...neg_words, w.word]
                    }
                  })
                : ''
              return (
                <Tweet
                  key={t.id}
                  createdAt={TweetDateTime(t.created_at)}
                  content={t.text}
                  polarity={t.polarity}
                  posWords={pos_words.join(', ')}
                  negWords={neg_words.join(', ')}
                />
              )
            })}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  sentimentLoading: state.tweets.sentimentLoading,
  finalTweets: state.tweets.finalTweets
})

export default connect(
  mapStateToProps,
  {}
)(TweetViewer)
