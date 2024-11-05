import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../image/HinhGioiThieu/logo.png")}
      />
      <View style={styles.login}>
        <Text
          style={{
            color: "#4B2C20",
            fontFamily: "Roboto",
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Đăng Nhập
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../image/HinhGioiThieu/nhieuhatcaphe.png")} />
        </View>

        <Text
          style={{
            padding: 10,
            color: "#4E8D7C",
            fontSize: 15,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            height: 50,
            width: "90%",
            borderRadius: 20,
            paddingLeft: 10,
            borderColor: "gray",
            alignSelf: "center",
            backgroundColor: "#fff",
            paddingHorizontal: 15,
            elevation: 5, // cho Android
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
          placeholder="Nhập email"
        />

        <Text
          style={{
            padding: 10,
            color: "#4E8D7C",
            fontSize: 15,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          Mật khẩu
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            width: "90%",
            borderRadius: 20,
            paddingLeft: 10,
            alignSelf: "center",
            borderColor: "gray",
            backgroundColor: "#fff",
            elevation: 5,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
        >
          <TextInput
            style={{
              height: 50,
              width: "80%",
              borderRadius: 15,
            }}
            secureTextEntry={!showPassword}
            placeholder="Nhập mật khẩu"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate()}>
            <Text style={styles.forgotPassword}>Quên mật khẩu ?</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "Roboto",
                color: "#989898",
                fontSize: 15,
              }}
            >
              Bạn chưa có tài khoản ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  color: "#6E3D2C",
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  fontSize: 15,
                }}
              >
                Đăng ký ngay !
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate()}>
            <View
              style={{
                backgroundColor: "#4B2C20",
                width: "80%",
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                margin: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto",
                  fontSize: 20,
                }}
              >
                Đăng Nhập
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#AE7A51",
  },
  logo: {
    width: 100,
    height: 100,
    margin: 15,
  },
  login: {
    flex: 1,
    height: 100,
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  forgotPassword: {
    color: "#AE7A51",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    fontFamily: "Roboto",
  },
});

export default LoginScreen;
