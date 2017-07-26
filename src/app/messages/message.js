import React, {Component} from "react";
import PropTypes from "prop-types";

const styles = {
  json: {
    height: '10rem',
    width: '10rem',
    overflow: 'hidden',
    margin: '1rem',
    padding: '1rem'
  },
};

export class Message extends Component {

  render() {
    return (
      <div style={styles.json}>
        {JSON.stringify(this.props.content.message)}
      </div>
    );
  }
}

Message.propTypes = {
  content: PropTypes.object.isRequired,
};
