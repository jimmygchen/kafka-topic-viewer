import React, {Component} from 'react';
import Websocket from 'react-websocket';

import {Message} from './message';

const styles = {
  container: {
    margin: '1rem'
  },
  h2: {
    fontWeight: 300,
    fontSize: '1.5rem'
  },
  messages: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
};

export class Messages extends Component {
  constructor() {
    super();
    this.state = {messages: []};
  }

  handleData(data) {
    let result = JSON.parse(data);
    this.state.messages.unshift(result);
    this.setState({messages: this.state.messages});
  }

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.h2}>
          {this.props.title}
        </h2>
        <div style={styles.messages}>
          {this.state.messages.map((message, i) => (
            <Message key={i} json={message}/>
          ))}
        </div>

        <Websocket url={this.props.wsUrl}
                   onMessage={this.handleData.bind(this)}/>
      </div>
    );
  }
}

Messages.propTypes = {
  wsUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

