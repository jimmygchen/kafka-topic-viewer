import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Messages} from './messages/messages';
import {AddTopicForm} from './addTopicForm';
import config from './config';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    margin: '0 1rem'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

export class Main extends Component {
  constructor() {
    super();
    this.state = {topics: []}
  }

  addTopic(topicName) {
    this.state.topics.push(topicName);
    this.setState({topics: this.state.topics});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <h1 style={styles.h1}>Kafka Topic Viewer</h1>
          <main style={styles.main}>
            {/*<AddTopicForm onSubmit={this.addTopic.bind(this)}/>*/}
            {config.topics.map((topicName) => (
              <Messages title={topicName} key={topicName} limit={config.messageLimit}
                        // FIXME: remove offset - testing purpose only
                        wsUrl={`${config.kafkaProxyWS}/?topic=${topicName}&consumerGroup=${config.consumerGroup}&offset=1`}/>
            ))}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}
