import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Card = ({ title, description }) => {
  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{description}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 8,
    width: "87.5%",
    borderTopWidth: 4,
    borderColor: "#DECA9D",
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    padding: 4
  }
});

export default Card