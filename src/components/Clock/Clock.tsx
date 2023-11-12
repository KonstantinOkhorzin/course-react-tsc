import { Component } from 'react';

import { Wrapper } from './Clock.styled';

interface IClockState {
  time: Date;
}

class Clock extends Component {
  state: IClockState = {
    time: new Date(),
  };

  intervalId: number | null = null;

  componentDidMount() {
    this.intervalId = setInterval(() => this.setState({ time: new Date() }), 1000);
  }

  componentWillUnmount() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { time } = this.state;

    return (
      <Wrapper>
        <p>Current time: {time.toLocaleTimeString()}</p>
      </Wrapper>
    );
  }
}

export default Clock;
