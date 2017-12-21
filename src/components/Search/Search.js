import React, { Component } from 'react';

import './../Home/Home.css';
import data from './../../data.js';


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      words: [],
      userInput: '',
      autocompleteSuggestions: [],
      rowHighlighted: -1,
    }
  }

  componentDidMount(){
    this.setState({
      words: data.words
    })
  }

  handleUserInput(e) {
    let input = e.target.value;
    let words = this.state.words;
    let matches = [];

    if (input){
      for (let i = 0; i < words.length; i++){
        if (words[i].startsWith(input) && matches.length < 10){
          matches.push(words[i]);
        }
      }
    }

    this.setState({
      userInput: input,
      autocompleteSuggestions: matches
    })
  }

  selectAutocomplete(index){
    this.setState({
      userInput: this.state.autocompleteSuggestions[index],
      autocompleteSuggestions: []
    })
  }

  handleKeyPress(e){
    let matches = this.state.autocompleteSuggestions;
    let row = this.state.rowHighlighted;
    let userInput = this.state.userInput;

    if (e.key === 'ArrowUp' && row > -1){
      e.preventDefault();
      row --;
    }
    if (e.key === 'ArrowDown' && row < matches.length - 1){
      e.preventDefault();
      row ++;
    }
    if (e.key === 'Enter'){
      e.preventDefault();
      userInput = matches[row];
      matches = [];
    }

    this.setState({
      rowHighlighted: row,
      userInput: userInput,
      autocompleteSuggestions: matches
    })
  }

  setRowHighlighted(i){
    this.setState({
      rowHighlighted: i
    })
  }

  render() {
    return (
      <div className="search">
        <div className='search_box'>

          <img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/6466217/fixed-google-logo-font.png' alt='google logo' className='google_logo' />

          <div className='search_bar'>
            <input value={this.state.userInput} onChange={(e) => this.handleUserInput(e)} onKeyDown={ (e) => this.handleKeyPress(e) } />
            <img src='http://www.androidpolice.com/wp-content/uploads/2015/09/nexus2cee_GoogleLogo2.jpg' alt='voice logo' />
            <div className='autocomplete_suggestions'>
              {
                this.state.autocompleteSuggestions.map( (item, i) => {
                  let background = i === this.state.rowHighlighted ? '#ccc' : '#fff';
                  return <p key={i} className='autocomplete_suggestions_item' onClick={() => this.selectAutocomplete(i)} style={{background: background}} onMouseOver={() => this.setRowHighlighted(i)} >{item}</p>
                })
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}


export default Search;