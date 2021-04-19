import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Slider from "react-native-sliders";

var device_width = Dimensions.get('window').width;

class BasicSlider extends React.Component {
    state = {
        value: 0.5
    };
    updateValue = function(value) {
        num = Number(value.value);
        global.max_volume = Math.round(num * 100) / 100;
        this.setState(value);
    }

    render() {
        return (
        <View style={styles.container}>
            <Slider
            value={this.state.value}
            onValueChange={value => this.updateValue({ value })}
            />
            <Text style={styles.textCenter}>
                {Math.round(Number(this.state.value) * 100)}%
            </Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: device_width - device_width/10
    },
    textCenter: {
        fontSize: 16,
        textAlign: "center"
    }
});

export default BasicSlider;