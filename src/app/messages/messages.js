import React, {Component} from 'react';
import Websocket from 'react-websocket';

import {Message} from './message';
import {MessageDialog} from './messageDialog';

import { CSSTransitionGroup } from 'react-transition-group';
import {GridList, GridTile} from 'material-ui/GridList';

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
      result.reverse();
      result.forEach((message) => this.state.messages.unshift(message))
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
              <CSSTransitionGroup key={message.offset}
                transitionName="message"
                transitionAppear={true}
                transitionAppearTimeout={300}
                transitionEnter={false}
                transitionLeave={false}>
                <GridTile>
                  <div style={styles.messages}>
                    <Message json={message} onClick={this.openDialog.bind(this)}/>
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
  wsUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  limit: React.PropTypes.number
};