import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

const styles = {
  json: {
    height: '15rem',
    width: '15rem',
    overflow: 'hidden',
    margin: '1rem',
    padding: '1rem'
  },
};

export class Message extends Component {

  render() {
    return (
      <div style={styles.json}>
        <ReactJson src={this.props.content} displayDataTypes={false}/>
      </div>
    );
  }
}

Message.propTypes = {
  content: PropTypes.object.isRequired,
};
