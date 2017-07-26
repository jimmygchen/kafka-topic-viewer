import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from "prop-types";

export class Header extends Component {
  render() {
    return (
      <header>
        <AppBar title="Kafka Topic Viewer"
                onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}/>
      </header>
    );
  }
}

Header.propTypes = {
  onLeftIconButtonTouchTap: PropTypes.func.isRequired,
};