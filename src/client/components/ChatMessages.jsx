import React from 'react';
import { VIEW } from '../lib/const';

export default class ChatMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="chat-messages--container">
        <div className="chat-messages--feed">

        </div>
      </div>
    );
  }
};
