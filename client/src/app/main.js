import React, {Component} from "react";

import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

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
    flex: '0 1 400px',
    marginRight: '1rem'
  }
};

const STORAGE_KEY_CONSUMER_ID = 'kafkaTopicViewerConsumerId';
const STORAGE_KEY_MONITORING_TOPICS = 'kafkaTopicViewerMonitoringTopics';

export class Main extends Component {
  constructor() {
    super();

    let storageMonitoringTopics = localStorage.getItem(STORAGE_KEY_MONITORING_TOPICS);
    storageMonitoringTopics = storageMonitoringTopics && JSON.parse(storageMonitoringTopics);

    let topics = config.topics.map((topicName, index) => {
      // check if monitoring topics exists in storage, otherwise toggle the first n topics.
      let monitoring = Array.isArray(storageMonitoringTopics) ?
        storageMonitoringTopics.indexOf(topicName) > -1 : index < config.defaultNumOfTopics;
      return {topicName, monitoring};
    });

    this.consumerGroup = localStorage.getItem(STORAGE_KEY_CONSUMER_ID) || createNewConsumerGroup();
    this.state = {open: false, topics};

    window.addEventListener('unload', () => {
      let monitoringTopics = this.state.topics.filter(topic => topic.monitoring).map(topic => topic.topicName);
      localStorage.setItem(STORAGE_KEY_MONITORING_TOPICS, JSON.stringify(monitoringTopics));
    })
  }

  toggleDrawer() {
    this.setState({open: !this.state.open});
  }

  toggleTopic(topic) {
    topic.monitoring = !topic.monitoring;
    this.setState({topics: this.state.topics});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <Header onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}/>
          <Drawer open={this.state.open} docked={false}
                  onRequestChange={(open) => this.setState({open})}>
            <List>
              <Subheader>Toggle Topics</Subheader>
              {this.state.topics.map(topic => (
                <ListItem key={topic.topicName} primaryText={topic.topicName}
                          rightToggle={<Toggle defaultToggled={topic.monitoring}
                                               onToggle={this.toggleTopic.bind(this, topic)}/>}/>
              ))}
            </List>
          </Drawer>
          <main style={styles.main}>
            {this.state.topics
              .filter(topic => topic.monitoring)
              .map((topic) => (
                <div style={styles.topic} key={topic.topicName}>
                  <Messages title={topic.topicName} limit={config.messageLimit}
                            wsUrl={`${config.kafkaProxyWS}/?topic=${topic.topicName}&consumerGroup=${this.consumerGroup}`}/>
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
  localStorage.setItem(STORAGE_KEY_CONSUMER_ID, consumerGroup);
  return consumerGroup;
}

function generateId() {
  return Math.random().toString(16).substring(2, 8);
}