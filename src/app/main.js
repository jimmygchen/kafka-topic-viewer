import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Header} from "./header";
import {Messages} from "./messages/messages";
import config from "./config";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    backgroundColor: '#fafafa'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: '1rem'
  },
  topic: {
    flex: 1,
    flexBasis: 0,
    marginRight: '1rem'
  }
};

const LOCAL_STORAGE_KEY = 'kafkaTopicViewerConsumerId';

export class Main extends Component {
  constructor() {
    super();
    this.state = {topics: []};
    this.consumerGroup = localStorage.getItem(LOCAL_STORAGE_KEY) || createNewConsumerGroup();
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
                          wsUrl={`${config.kafkaProxyWS}/?topic=${topicName}&consumerGroup=${this.consumerGroup}`}/>
              </div>
            ))}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

function createNewConsumerGroup() {
  let consumerGroup = config.consumerGroupPrefix + generateId();
  localStorage.setItem(LOCAL_STORAGE_KEY, consumerGroup);
  return consumerGroup;
}

function generateId() {
  return Math.random().toString(16).substring(2, 8);
}