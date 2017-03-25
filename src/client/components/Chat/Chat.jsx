import React, { Component } from 'react';
import { VIEW } from '../../../const';

/* Component styles */
import styles from './chat.css';

/* Chat Components */
import ChatMessages from '../ChatMessages/ChatMessages.jsx';
import ChatInput from '../ChatInput/ChatInput.jsx';


export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      this_view: VIEW.CHAT,                    // this component is landing view
    };
  }

  render() {
    if (this.props.current_view === this.state.this_view) {
      return (
        <div className={styles.container}>
          <ChatMessages nickname={this.props.nickname} />
          <ChatInput nickname={this.props.nickname} />
        </div>
      );
    }
    return null;
  }
}
