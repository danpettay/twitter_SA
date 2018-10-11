import React, { PureComponent } from 'react'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
  Collapse
} from 'reactstrap'

export default class AppNavbar extends PureComponent {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  //
  render() {
    return (
      <div>
        <Navbar
          dark
          expand="sm"
          className="mb-5"
          style={{ backgroundColor: '#255228' }}
        >
          <Container>
            <NavbarBrand href="/">TG GeoTweets Sentiment Analyzer</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar />
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
