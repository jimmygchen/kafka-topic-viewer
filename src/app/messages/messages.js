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

  messages: {
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
          Topic: {this.props.title} ({this.state.messages.length})
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
                  actionIcon={<IconButton><ActionPageview color="black"/></IconButton>}
                  onClick={this.openDialog.bind(this, message.content)}>
                  <div style={styles.messages}>
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