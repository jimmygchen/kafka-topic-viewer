import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

const styles = {
  json: {
    height: '20rem',
    width: '20rem',
    border: '1px solid lightgray',
    borderRadius: '1rem',
    margin: '1rem',
    padding: '1rem',
    overflow: 'scroll'
  },
};

export class Message extends Component {

  handleClick() {
    this.props.onClick(this.props.json)
  }

  render() {
    return (
      <div style={styles.json} onClick={this.handleClick.bind(this)}>
        <ReactJson src={this.props.json} displayDataTypes={false}/>
      </div>
    );
  }
}

Message.propTypes = {
  json: PropTypes.object.isRequired,
  handleClick: PropTypes.func
};
