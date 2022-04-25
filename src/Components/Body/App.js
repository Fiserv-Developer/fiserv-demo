import React, { Component } from 'react'

export default class Body extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
