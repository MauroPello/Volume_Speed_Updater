import React from 'react';
import { View, Button } from 'react-native';
import BackgroundTimer from "react-native-background-timer";
import Geolocation from 'react-native-geolocation-service';

type TimerProps = {};
type TimerState = {};

class BackgroundTimerWrapper extends React.PureComponent<TimerProps, TimerState> {
  static defaultProps: any

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      second: 0,
    }
  }

  _interval: any;

  start = () => {
    this._interval = BackgroundTimer.setInterval(() => {
      this.setState({
        second: this.state.second + 1,
      });
      console.log(this.state.second);
    }, 1000);
  }

  stop = () => {
    BackgroundTimer.clearInterval(this._interval);
  }

  renderStartButton = () => {
    return (
      <Button title="Start" onPress={this.start} />
    )
  }

  renderStopButton = () => {
    return (
      <Button title="Stop" onPress={this.stop} />
    )
  }

  renderContent = (): ReactElement<any> => {
    return (
      <View>
        <View>
          {this.renderStartButton()}
          {this.renderStopButton()}
        </View>
      </View>
    );
  }

  render() {
    const content = this.renderContent();

    return content;
  }
}

BackgroundTimerWrapper.propTypes = {};

BackgroundTimerWrapper.defaultProps = {};

export default BackgroundTimerWrapper;