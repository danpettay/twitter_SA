import React, { PureComponent } from 'react'
import Container from './Container'

class Tweet extends PureComponent {
  render() {
    return (
      <Container
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          height: 'auto',
          width: '95%',
          justifyContent: 'space-between',
          display: 'flex',
          margin: '5px auto',
          padding: '5px'
        }}
      >
        <Container style={{ height: '100%', width: '20%', padding: '2px' }}>
          {this.props.createdAt}
        </Container>
        <Container style={{ height: '100%', width: '50%', padding: '2px' }}>
          {this.props.content}
        </Container>
        <Container style={{ height: '100%', width: '10%', padding: '2px' }}>
          {this.props.polarity}
        </Container>
        <Container
          style={{
            height: '100%',
            width: '10%',
            color: '#090',
            padding: '2px'
          }}
        >
          {this.props.posWords}
        </Container>
        <Container
          style={{
            height: '100%',
            width: '10%',
            color: '#900',
            padding: '2px'
          }}
        >
          {this.props.negWords}
        </Container>
      </Container>
    )
  }
}

export default Tweet
