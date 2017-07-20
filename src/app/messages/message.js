import React, {Component} from 'react';
import ReactJson from 'react-json-view';

const styles = {
  json: {
    height: '15rem',
    width: '15rem',
    border: '1px solid lightgray',
    borderRadius: '1rem',
    margin: '1rem',
    padding: '1rem',
    overflow: 'scroll'
  },
};

export class Message extends Component {
  render() {
    return (
      <div style={styles.json}>
        <ReactJson src={this.props.json} displayDataTypes={false}/>
      </div>
    );
  }
}

Message.propTypes = {
  json: React.PropTypes.object.isRequired
};
