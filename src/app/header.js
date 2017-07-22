import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar'

export class Header extends Component {
  render() {
    return (
      <header>
        <AppBar title="Kafka Topic Viewer"/>
      </header>
    );
  }
}
