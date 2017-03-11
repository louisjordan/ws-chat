import React, { Component } from 'react';
import { VIEW } from '../../lib/const';

/* Component styles */
import styles from './chat-input.css';

export default class ChatInput extends Component {
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
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => {this.handleInputSubmit(e);}}>
          <input className={styles.message_input}></input>
          <button className={styles.send_button}>Send</button>
        </form>
      </div>
    );
  }
};
