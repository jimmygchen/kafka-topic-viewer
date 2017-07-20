import React, {Component} from 'react';
import {Messages} from './messages/messages';
import config from './config';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

export class Main extends Component {
  render() {
    return (
      <div style={styles.container}>
        <main style={styles.main}>
          <Messages title={config.topicName} wsUrl={`${config.kafkaProxyWS}/?topic=${config.topicName}&consumerGroup=${config.consumerGroup}`}/>
        </main>
      </div>
    );
  }
}
