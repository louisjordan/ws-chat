import React, { Component } from 'react';
import { VIEW } from '../../../const';

/* Component styles */
import styles from './app.css';

/* Components */
import Landing from '../Landing/Landing.jsx';
import Chat from '../Chat/Chat.jsx';

/* WebSocket server stuff */
import ws from '../../lib/WSclient';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      current_view: VIEW.LANDING,    // the initial view is the landing screen
      nickname: '',
    };

    this.changeView = this.changeView.bind(this);
    this.setNickname = this.setNickname.bind(this);
  }

  /*
    Set the user's nickname
    @param nickname string
  */
  setNickname(nickname) {
    this.setState({ nickname });
  }

  changeView(new_view) {
    if (new_view) {
      this.setState({ current_view: new_view });
    }
  }

  render() {
    return (
      <div className={styles.ws_chat}>
        <Landing current_view={this.state.current_view} setNickname={this.setNickname} changeView={this.changeView} />
        <Chat current_view={this.state.current_view} nickname={this.state.nickname} />
      </div>
    );
  }
}
