import {ImageBackground, StyleSheet, Text} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class Header extends React.Component{
  render() {
    return (
      <ImageBackground
        accessibilityRole="image"
        source={require("../logo.jpg")}
        style={[
          styles.background,
          {
            backgroundColor: Colors.darker,
          },
        ]}
        imageStyle={styles.logo}>
        <Text
          style={[
            styles.text,
            {
              color: Colors.white,
            },
          ]}>
          {this.props.text}
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192,
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Header;