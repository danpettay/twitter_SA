import React, { PureComponent } from 'react'
import { Container } from 'reactstrap'

class MyContainer extends PureComponent {
  //   constructor(props) {
  //     super(props)
  //   }

  render() {
    return <div style={this.props.style}>{this.props.children}</div>
  }
}

export default MyContainer
