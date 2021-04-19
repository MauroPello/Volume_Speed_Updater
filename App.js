import React from 'react';
import Section from './components/section';
import BasicSlider from './components/basic-slider';
import Header from './components/header';
import Geolocation from 'react-native-geolocation-service';
import SystemSetting from 'react-native-system-setting';
import BackgroundTimer from 'react-native-background-timer';
import NumericInput from 'react-native-numeric-input';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

class App extends React.Component {
  backgroundStyle = { backgroundColor: Colors.black };
  state = { currentSpeed: 0 };
  max_speed = 100;

  componentDidMount() {
    global.max_volume = 0.5;
    SystemSetting.setVolume(0);

    const self = this;
    BackgroundTimer.runBackgroundTimer(function() {
      Geolocation.getCurrentPosition(
        (position) => {
          self.setState({
            currentSpeed: Math.round(position.coords.speed * 3.6 * 10) / 10
          });
          if (self.state.currentSpeed > self.max_speed)
            SystemSetting.setVolume(global.max_volume);
          else
            SystemSetting.setVolume(self.state.currentSpeed / self.max_speed * global.max_volume);
        }, 
        (error) => {
          console.log(error.code, error.message);
        },
        { maximumAge: 2000, enableHighAccuracy: true, forceRequestLocation: true }
      );
    }, 1000);
  }
  
  componentWillUnmount() {
    Geolocation.stopObserving();
    BackgroundTimer.stopBackgroundTimer();
  }

  render (){
    return (
      <SafeAreaView style={this.backgroundStyle}>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={this.backgroundStyle}>
        <Header text="Welcome to my App!" />
        <View
          style={{
            backgroundColor: Colors.black,
          }}>
          <Section title="Max Speed">
            <NumericInput value={this.max_speed} step={5} onChange={value => this.max_speed = value} />
          </Section>
          <Section title="Max Volume">
            <BasicSlider></BasicSlider>
          </Section>
          <Section title="Velocity">
            <Text>
              {this.state.currentSpeed} km/h
            </Text>
          </Section>
          <Section title="Information">
            <Text>
              Max Volume is set at {global.max_volume * 100}% and it can be reached at {this.max_speed} km/h 
            </Text>
          </Section>
          <Section>
            <Text>
              This app was made by Mauro Pellonara. 
            </Text>
          </Section>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default App;