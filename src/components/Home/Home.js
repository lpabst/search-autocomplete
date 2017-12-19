import React, { Component } from 'react';

import './Home.css';
import data from './../../data.js';


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      words: [],
      userInput: '',
      autocompleteSuggestions: [],
      autocompleteRowHighlighted: -1,
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

  handleKeyPress(e){
    if (e.key == 'ArrowDown' || e.key == 'ArrowUp' || e.key == 'Enter'){
      e.preventDefault();
    }else{
      return;
    }

    let rowHighlighted = this.state.autocompleteRowHighlighted;

    if (e.key == 'ArrowDown' && rowHighlighted < this.state.autocompleteSuggestions.length - 1){
      rowHighlighted ++;
    }
    if (e.key == 'ArrowUp' && rowHighlighted > -1){
      rowHighlighted --;
    }
    if (e.key == 'Enter' && rowHighlighted >= 0){
      let selection = this.state.autocompleteSuggestions[rowHighlighted];
      return this.selectAutocomplete(selection);
    }

    this.setState({
      autocompleteRowHighlighted: rowHighlighted
    })
  }

  setRowHighlighted(index){
    this.setState({
      autocompleteRowHighlighted: index
    })
  }

  selectAutocomplete(item){
    this.setState({
      userInput: item,
      autocompleteSuggestions: [],
      autocompleteRowHighlighted: -1
    })
  }

  render() {
    return (
      <div className="home">
          <div className='search_box'>

            <img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/6466217/fixed-google-logo-font.png' alt='google logo' className='google_logo' />

            <div className='search_bar'>
              <input value={this.state.userInput} onChange={ (e) => this.handleUserInput(e) } onKeyDown={ (e) => this.handleKeyPress(e) } />
              <img src='http://www.androidpolice.com/wp-content/uploads/2015/09/nexus2cee_GoogleLogo2.jpg' alt='voice logo' />
                <div className='autocomplete_suggestions'>
                  {
                    this.state.autocompleteSuggestions.map( (item, i) => {
                      let background = (i === this.state.autocompleteRowHighlighted) ? '#ccc' : '#fff';
                      return  <div key={i} onClick={() => this.selectAutocomplete(item)} onMouseOver={ () => this.setRowHighlighted(i) } style={{background: background}} className='autocomplete_suggestions_item'>
                                <p>{item}</p>
                              </div>
                    })
                  }
                </div>
            </div>

          </div>
      </div>
    );
  }
}


export default Home;