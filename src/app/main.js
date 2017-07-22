import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Header} from './header';
import {Messages} from './messages/messages';
import config from './config';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem'
  },
  topic: {
    marginBottom: '2rem'
  }
};

export class Main extends Component {
  constructor() {
    super();
    this.state = {topics: []}
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <Header/>
          <main style={styles.main}>
            {config.topics.map((topicName) => (
              <div style={styles.topic} key={topicName}>
                <Messages title={topicName} limit={config.messageLimit}
                  // FIXME: remove offset - testing purpose only
                          wsUrl={`${config.kafkaProxyWS}/?topic=${topicName}&consumerGroup=${config.consumerGroup}&offset=1`}/>
              </div>
            ))}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}
