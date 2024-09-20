import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#AE7A51", "#AE7A51", "#D3B6A0", "#F5EFEA"]}
      style={styles.container}
    >
      <Image
        style={styles.logo}
        source={require("../image/HinhGioiThieu/logo.png")}
      />
      <View style={styles.slogan}>
        <Text style={styles.textSlogan}>Tận hưởng hương vị</Text>
        <Text style={styles.textSlogan}>cà phê !</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={styles.start}>
          <Text style={styles.textStart}>Bắt Đầu</Text>
          <Image source={require("../image/HinhGioiThieu/caphe.png")} />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  slogan: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textSlogan: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Times New Roman",
  },
  start: {
    flexDirection: "row",
    width: 250,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textStart: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#583732",
    fontFamily: "Times New Roman",
    right: 10,
  },
});

export default HomeScreen;
