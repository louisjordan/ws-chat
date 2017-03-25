import React, { Component } from 'react';
import { VIEW } from '../../../const';

/* Component styles */
import styles from './chat-messages.css';

export default class ChatMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.feed}>
          Whats going on
        </div>
      </div>
    );
  }
};
