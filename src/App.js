import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      file: null
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`http://localhost:8080/ads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // handle your response;
    }).catch(error => {
      // handle your error
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitFile}>
          <input label='Upload File' type='file' onChange={(e)=>this.setState({file: e.target.files})} />
          <Button variant="contained" color="secondary" type="submit" label="submit">
            Submit
          </Button>
        </form>

    
      </div>
    );
  }
}

export default App;