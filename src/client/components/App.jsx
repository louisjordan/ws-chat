import React from 'react';
import { VIEW } from '../lib/const.js';

/* Components */
import Landing from './Landing.jsx';
import Chat from './Chat.jsx';


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      current_view: VIEW.LANDING,    // the initial view is the landing screen
      nickname: ''
    };

    this.changeView = this.changeView.bind(this);
    this.setNickname = this.setNickname.bind(this);
  }

  /*
    Set the user's nickname
    @param nickname string
  */
  setNickname(nickname) {
    this.setState({nickname});
  }

  changeView(new_view) {
    if(new_view) {
      this.setState({current_view: new_view});
    }
  }

  render() {
    return (
      <div className="ws-chat">
        <Landing current_view={this.state.current_view} setNickname={this.setNickname} changeView={this.changeView}/>
        <Chat current_view={this.state.current_view} nickname={this.state.nickname}/>
      </div>
    );
  }
};
