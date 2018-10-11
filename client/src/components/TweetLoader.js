import React, { PureComponent } from 'react'
import { Button, Input, Form, FormGroup, Label } from 'reactstrap'
import { getTweets } from '../actions/tweetActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Container from './Container'
import { colors } from '../assets/sharedUI'

///////// TWITTER API RULES ///////////////
/// ...search/tweets.json?q=PARAMS GO HERE
/// see tweets from a certain user: add "from:port_a_pettay+" (from%3Aport_a_pettay%20)
/// see hashtags: add "#blarg" (%23blarg)
/// example URL: ...search/tweets.json?q=from%3Aport_a_pettay%20%23blarg
///////////////////////////////////////////

class TweetLoader extends PureComponent {
  state = {
    hashtag: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const qparams = encodeURIComponent('#' + this.state.hashtag)
    this.props.getTweets(qparams)
  }

  render() {
    return (
      <Container
        style={{
          backgroundColor: colors.green1,
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
            fontWeight: 600
          }}
        >
          Search Tweets
        </Label>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="hashtag">
              Enter Hashtags (separate by space if multiple)
            </Label>
            <Input
              type="text"
              name="hashtag"
              placeholder="Chik Fil a"
              onChange={this.onChange}
            />
            <Button color="dark" style={{ marginTop: '2rem' }} block>
              Search Tweets
            </Button>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

TweetLoader.propTypes = {
  getTweets: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tweets: state.tweets.tweets
})

export default connect(
  mapStateToProps,
  { getTweets }
)(TweetLoader)
