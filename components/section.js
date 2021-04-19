import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';

class Section extends React.Component {
    render () {
    return (
        <View style={styles.sectionContainer}>
            <Text
            style={[
                styles.sectionTitle,
                {
                color: Colors.black,
                },
            ]}>
            {this.props.title}
            </Text>
            <Text
            style={[
                styles.sectionDescription,
                {
                color: Colors.dark,
                },
            ]}>
            {this.props.children}
            </Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    }
});

export default Section;