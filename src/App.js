import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      file: null,
      marker: null
    };
  }

  submitFile = (event) => {
    event.preventDefault();

    if (!this.state.marker) {
      alert('Select a marker you dummy!')
      return
    }
    if (!this.state.file) {
      alert('Choose a file you dummy!')
      return;
    }

    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    formData.append('markerName', this.state.marker || 'test');
    axios.post(`/uploadAd`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      // handle your success
    }).catch(err => console.log(err));
  }

  selectMarker = (e) => {
    this.setState({ marker: e.target.value })
  }

  render() {
    return (
      <div style={{marginTop: "100px"}}>
        <center>
          <div style={{marginLeft:"auto", marginRight:"auto"}} id="radioButtons" onChange={this.selectMarker}>
            
            <div style={{padding:"15px"}}>  
              <label style={{padding:"20px", textAlign: "left"}}><img src="https://i.stack.imgur.com/5cahN.png" width ="200" height = "200" alt="hiro"/></label>
              <input  type="radio" name="radioButtons" id="Hiro" value="hiro"/> Hiro<br />
            </div>
                    
            <div style={{padding:"15px"}}>     
              <label style={{padding:"20px", textAlign: "left"}}>
                <img src="https://cdn.glitch.com/1a6977ed-1215-4fb9-b040-5862a9786b35%2Fkanji-marker.png?1507486751836" width ="200" height = "200" alt="kanji"/>
              </label>
              <input type="radio" name="radioButtons" id="Kanji" value="kanji"/> Kanji<br />
            </div>

            <div style={{padding:"15px"}}> 
              <label style={{padding:"20px", textAlign: "left"}}><img src="../twodots.png" width ="200" height = "200" alt="barcode0"/></label>
              <input type="radio" name="radioButtons" id="TwoDots" value="twodots"/> TwoDots<br />
            </div>

            {/* <div style={{padding:"15px"}}>    
              <label style={{padding:"20px", textAlign: "left"}}><img src="../letterc.png" width ="200" height = "200" alt="barcode10"/></label> 
              <input type="radio" name="radioButtons" id="LetterC" value="letterc"/> LetterC<br />
            </div>    
              
            <div style={{padding:"15px"}}>    
              <label style={{margin:"20px", textAlign: "left"}}><img src="https://i.imgur.com/ZwyRxJH.png" width ="200" height = "200" alt="stairs"/></label>    
              <input type="radio" name="radioButtons" id="Stairs" value="stairs"/> Stairs<br />
            </div> */}

          </div>
         </center>

        <div style={{textAlign: "center"}}>
          <span  className="w3-text-blue" style={{fontSize: 36}} >Upload Your Image!</span>
        </div>

        <center>
        <div >
          <form onSubmit={this.submitFile}>
            <input  label='Upload File' type='file' onChange={(e)=>this.setState({file: e.target.files})} />
            <Button style={{margin: "10px"}} variant="contained" color="secondary" type="submit" label="submit">
              Submit
            </Button>
          </form>
        </div>
        </center>
      </div>
    );
  }
}

export default App;