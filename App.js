import React from 'react';
import Section from './components/section';
import Header from './components/header';
import Slider from '@react-native-community/slider';
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
  Dimensions,
} from 'react-native';

class App extends React.Component {
  backgroundStyle = { backgroundColor: Colors.black };
  maxWidth = Dimensions.get('window').width;
  state = { 
    currentSpeed: 0,
    maxSpeed: 100,
    maxVolume: 0.5
  };
  updateStateValue = function(name, value) {
    var copy = this.state;
    copy[name] = value;
    this.setState(copy);
  }

  componentDidMount() {
    SystemSetting.setVolume(0);

    const self = this;
    BackgroundTimer.runBackgroundTimer(function() {
      Geolocation.getCurrentPosition(
        (position) => {
          var speed = Math.round(position.coords.speed * 3.6 * 10) / 10;
          if (Math.abs(speed - self.state.currentSpeed) > 1){
            self.updateStateValue("currentSpeed", speed)
            if (speed > self.state.maxSpeed)
              SystemSetting.setVolume(self.state.maxVolume);
            else
              SystemSetting.setVolume(speed / self.state.maxSpeed * self.state.maxVolume);
          }
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
        <View style={this.backgroundStyle}>
          <Section title="Max Speed">
            <NumericInput value={this.state.maxSpeed} step={5} minValue={0} maxValue={400} onChange={value => this.updateStateValue("maxSpeed", value)} />
          </Section>
          <Section title="Max Volume">
            <View>
            <Slider value={this.state.maxVolume} onValueChange={value => this.updateStateValue("maxVolume", value)} step={0.01} style={{ width: this.maxWidth - this.maxWidth / 10 }}/>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
                {Math.round(Math.round(Number(this.state.maxVolume) * 100) / 100 * 100)}%
            </Text>
            </View>
          </Section>
          <Section title="Velocity">
            <Text>
              {this.state.currentSpeed} km/h
            </Text>
          </Section>
          <Section title="Information">
            <Text>
              Max Volume is set at {this.state.maxVolume * 100}% and it can be reached at {this.state.maxSpeed} km/h 
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