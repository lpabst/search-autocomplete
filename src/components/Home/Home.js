import React, { Component } from 'react';

import './Home.css';
import data from './../../data.js';


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      showAutocompleteBox: true,
      autocompleteSuggestions: [],
      words: []
    }
  }

  componentDidMount(){
    this.setState({
      words: data.words
    })
  }

  handleUserInput(e){
    let input = e.target.value;
    let matches = [];

    if (input.length > 0){
      for (var i = 0; i < this.state.words.length; i++){
        if (this.state.words[i].startsWith(input)){
          matches.push(this.state.words[i]);
          if (matches.length >= 10){
            i = this.state.words.length + 1;
          }
        }
      }
    }

    this.setState({
      userInput: input,
      autocompleteSuggestions: matches
    })
  }

  selectAutocomplete(item){
    this.setState({
      userInput: item,
      autocompleteSuggestions: []
    })
  }

  render() {
    return (
      <div className="home">
          <div className='search_box'>

            <img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/6466217/fixed-google-logo-font.png' alt='google logo' className='google_logo' />

            <div className='search_bar'>
              <input value={this.state.userInput} onChange={ (e) => this.handleUserInput(e) } />
              <img src='http://www.androidpolice.com/wp-content/uploads/2015/09/nexus2cee_GoogleLogo2.jpg' alt='voice logo' />

              {
                this.state.showAutocompleteBox ? 
                  <div className='autocomplete_suggestions'>
                    {
                      this.state.autocompleteSuggestions.map( (item, i) => {
                        return  <div key={i} onClick={() => this.selectAutocomplete(item)} className='autocomplete_suggestions_item'>
                                  <p>{item}</p>
                                </div>
                      })
                    }
                  </div>
                : null
              }
            </div>

          </div>
      </div>
    );
  }
}


export default Home;