import React from 'react';
import { VIEW } from '../lib/const';


export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  handleInputSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="chat-input--container">
        <form className="chat-input--form" onSubmit={(e) => {this.handleInputSubmit(e);}}>
          <input className="chat-input--input"></input>
          <button className="chat-input--button">Send</button>
        </form>
      </div>
    );
  }
};
