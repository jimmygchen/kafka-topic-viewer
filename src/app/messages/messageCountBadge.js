import React, {Component} from "react";
import PropTypes from "prop-types";

const styles = {
  container: {
    position: "relative"
  },
  inner: {
    position: 'absolute',
    top: '0.7rem',
    right: '0.7rem'
  },
  messageCount: {
    display: 'flex',
    flexFlow: 'row wrap',
    placeContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: '12px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgb(0, 188, 212)',
    color: 'white',
  },
};

export class MessageCountBadge extends Component {
  render() {
    return (
      <div style={styles.container}>
        {this.props.children}
        <div style={styles.inner}>
          <div style={styles.messageCount}>{this.props.messageCount}</div>
        </div>
      </div>
    )
  }
}

MessageCountBadge.propTypes = {
  messageCount: PropTypes.number.isRequired
};

