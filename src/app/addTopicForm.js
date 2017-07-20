import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  textField: {
    minWidth: '30rem',
    marginRight: '1rem'
  }
};

export class AddTopicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField style={styles.textField} floatingLabelText="Topic Name" value={this.state.value} onChange={this.handleChange}/>
        <RaisedButton type="submit" label="Add Topic" primary={true} />
      </form>
    );
  }
}

AddTopicForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
