import React, { Component } from 'react';

import './../Home/Home.css';
import data from './../../data.js';


class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      userInput: ''
    }
  }

  handleUserInput(e){
    this.setState({
      userInput: input
    })
  }

  render() {
    return (
      <div className="Search">
          <div className='search_box'>

            <img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/6466217/fixed-google-logo-font.png' alt='google logo' className='google_logo' />

            <div className='search_bar'>
              <input value={this.state.userInput} onChange={ (e) => this.handleUserInput(e) } />
              <img src='http://www.androidpolice.com/wp-content/uploads/2015/09/nexus2cee_GoogleLogo2.jpg' alt='voice logo' />
            </div>

          </div>
      </div>
    );
  }
}


export default Search;