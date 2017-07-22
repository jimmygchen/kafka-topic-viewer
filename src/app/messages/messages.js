import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Websocket from 'react-websocket';
import moment from 'moment';

import {Message} from './message';
import {MessageDialog} from './messageDialog';

import {CSSTransitionGroup} from 'react-transition-group';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionPageview from 'material-ui/svg-icons/action/pageview';

const styles = {
  h2: {
    fontWeight: 300,
    fontSize: '1.5rem'
  },

  message: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  gridTile: {
    border: '1px solid lightgray',
    borderRadius: '1rem',
    marginRight: '0.5rem'
  },
  messageCount: {
    color: '#26C6DA'
  }
};

export class Messages extends Component {
  constructor() {
    super();
    this.state = {messages: []};
  }

  handleData(data) {
    let result = JSON.parse(data);
    if (Array.isArray(result)) {
      result.forEach((message) => {
        this.state.messages.unshift({content: message, moment: moment()})
      })
    }

    this.setState({messages: this.state.messages.slice(0, this.props.limit)});
  }

  openDialog(message) {
    this.setState({selected: message})
  }

  render() {
    return (
      <div>
        <h2 style={styles.h2}>
          {this.props.title} (<span style={styles.messageCount}>{this.state.messages.length}</span>)
        </h2>

        <div style={styles.root}>
          <GridList style={styles.gridList} cols={1} cellHeight="auto">
            {this.state.messages.map((message) => (
              <CSSTransitionGroup key={message.content.offset}
                                  transitionName="message"
                                  transitionAppear={true}
                                  transitionAppearTimeout={300}
                                  transitionEnter={false}
                                  transitionLeave={false}>
                <GridTile
                  title={message.content.offset} style={styles.gridTile}
                  subtitle={<span><b>{message.moment.fromNow()}</b></span>}
                  actionIcon={<IconButton><ActionPageview color="white"/></IconButton>}
                  onClick={this.openDialog.bind(this, message.content)}
                  titleBackground="linear-gradient(to top, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                  <div style={styles.message}>
                    <Message content={message.content}/>
                  </div>
                </GridTile>
              </CSSTransitionGroup>
            ))}
          </GridList>
        </div>

        <MessageDialog content={this.state.selected}/>

        <Websocket url={this.props.wsUrl}
                   onMessage={this.handleData.bind(this)}/>
      </div>
    );
  }
}

Messages.propTypes = {
  wsUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  limit: PropTypes.number
};