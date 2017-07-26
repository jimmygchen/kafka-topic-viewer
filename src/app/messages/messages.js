import React, {Component} from "react";
import PropTypes from "prop-types";
import Websocket from "react-websocket";
import moment from "moment";
import {MessageDialog} from "./messageDialog";
import {CSSTransitionGroup} from "react-transition-group";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import {darkBlack} from "material-ui/styles/colors";
import Paper from "material-ui/Paper";
import {MessageCountBadge} from "./messageCountBadge";

export class Messages extends Component {
  constructor() {
    super();
    this.state = {messages: [], messageCount: 0};
  }

  handleData(data) {
    let result = JSON.parse(data);
    if (Array.isArray(result)) {
      result.forEach((message) => {
        this.state.messages.unshift({content: message, moment: moment()});
        this.state.messageCount++;
      })
    }

    this.setState({messages: this.state.messages.slice(0, this.props.limit), messageCount: this.state.messageCount});
  }

  openDialog(message) {
    this.setState({selected: message})
  }

  render() {
    return (
      <div>
        <Paper zDepth={2}>
        <List>
          <Subheader>
            <MessageCountBadge messageCount={this.state.messageCount}>
              <span>{this.props.title}</span>
            </MessageCountBadge>
          </Subheader>

          {this.state.messages.length === 0 && (
            <ListItem
              primaryText={'No new message.'}
            />
          )}

          {this.state.messages.map((message, index) => {
            let divider = index > 0 && <Divider inset={false} />;
            return (
                <CSSTransitionGroup key={message.content.offset}
                                    transitionName="message"
                                    transitionAppear={true}
                                    transitionAppearTimeout={300}
                                    transitionEnter={false}
                                    transitionLeave={false}>
                  {divider}
                  <ListItem
                    primaryText={message.content.offset}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>{message.moment.fromNow()} - </span>
                        <span>{JSON.stringify(message.content.message)}</span>
                      </p>
                    }
                    secondaryTextLines={3}
                    onClick={this.openDialog.bind(this, message.content)}
                  />
                </CSSTransitionGroup>
              )
            }
          )}
        </List>
        </Paper>

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

