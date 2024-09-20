import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   // Thực hiện logic đăng nhập ở đây
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   // Điều hướng đến màn hình khác nếu đăng nhập thành công
  //   // navigation.navigate('HomeScreen');
  // };

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
            fontFamily: "Times New Roman ",
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
            color: "#4B2C20",
            fontSize: 15,
            fontWeight: "bold",
            fontFamily: "Times New Roman",
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            height: 40,
            width: "80% ",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 15,
            alignSelf: "center",
            paddingLeft: 10,
            color: "gray",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          placeholder="Nhập Email"
        ></TextInput>

        <Text
          style={{
            padding: 10,
            color: "#4B2C20",
            fontSize: 15,
            fontWeight: "bold",
            fontFamily: "Times New Roman",
          }}
        >
          Mật khẩu
        </Text>
        <TextInput
          style={{
            height: 40,
            width: "80% ",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 15,
            alignSelf: "center",
            paddingLeft: 10,
            color: "gray",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu"
        ></TextInput>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate()}>
            <Text style={styles.forgotPassword}>Bạn quên mật khẩu ?</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontFamily: "Times New Roman" }}>
              Bạn chưa có tài khoản ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  color: "#4B2C20",
                  fontWeight: "bold",
                  fontFamily: "Times New Roman",
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
                  fontFamily: "Times New Roman",
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
    color: "#4B2C20",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    fontFamily: "Times New Roman",
  },
});

export default LoginScreen;
