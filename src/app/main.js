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
    flex: 1,
    flexBasis: 0,
    marginRight: '1rem'
  }
};

const LOCAL_STORAGE_KEY = 'kafkaTopicViewerConsumerId';

export class Main extends Component {
  constructor() {
    super();
    let topics = config.topics.map((topicName, index) => {
      // monitor first n topics by configuration
      let monitoring = index < config.defaultNumOfTopics;
      return {topicName, monitoring};
    });

    this.consumerGroup = localStorage.getItem(LOCAL_STORAGE_KEY) || createNewConsumerGroup();
    this.state = {open: false, topics};
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
  localStorage.setItem(LOCAL_STORAGE_KEY, consumerGroup);
  return consumerGroup;
}

function generateId() {
  return Math.random().toString(16).substring(2, 8);
}