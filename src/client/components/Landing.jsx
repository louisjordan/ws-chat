import React from 'react';
import { VIEW } from '../lib/const';


export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      this_view: VIEW.LANDING,                      // this component is landing view
      input_error: ''
    };

    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleNicknameSubmit = this.handleNicknameSubmit.bind(this);
  }

  handleNicknameChange() {
    let nickname = document.querySelector('.nickname-input').value;

    if(nickname.length < 3) {
      this.setState({input_error: 'Nickname is too short!'});
    } else if(nickname.length > 16) {
      this.setState({input_error: 'Nickname is too long!'});
    } else {
      this.setState({input_error: '', nickname});
    }
  }

  handleNicknameSubmit(e) {
    e.preventDefault();

    let nickname = this.state.nickname;

    if(!this.state.input_error && nickname) {
      this.props.setNickname(nickname);
      this.props.changeView(VIEW.CHAT);
    }
  }

  render() {
    if(this.props.current_view === this.state.this_view) {
      return (
        <div className="landing--container">
          <div className="landing--content">
            <h1 className="landing--header">Welcome to WS Chat!</h1>
            <p className="landing--subheader">Please choose a name:</p>

            <form method="post" onSubmit={(e) => {this.handleNicknameSubmit(e);}}>
              <input type="text" className="landing--input nickname-input" onKeyUp={this.handleNicknameChange}/>
              <button className="landing--button" type="submit">></button>
            </form>

            <div className="landing--error">{this.state.input_error}</div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
};