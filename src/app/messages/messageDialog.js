import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactJson from 'react-json-view';

const customContentStyle = {
  width: '90%',
  maxWidth: 'none',
};


export class MessageDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({content: null, open: false});
  }

  componentWillReceiveProps(props) {
    if (!!props.content) {
      this.setState({content: props.content, open: true});
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="View Message"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
          <ReactJson src={this.props.content} displayDataTypes={false}/>
        </Dialog>
      </div>
    );
  }
}

MessageDialog.propTypes = {
  content: React.PropTypes.object
};