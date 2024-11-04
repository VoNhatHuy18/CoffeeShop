import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { register } from "../Service/authService";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      setMessage("Đăng ký thành công!");
    } catch (error) {
      setMessage("Đăng ký thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={styles.logo}
          source={require("../image/HinhGioiThieu/logo.png")}
        />

        <View style={styles.login}>
          <Text style={styles.title}>Đăng Ký</Text>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../image/HinhGioiThieu/nhieuhatcaphe.png")}
            />
          </View>

          <Text style={styles.label}>Họ Và Tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập Họ Và Tên"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Mật Khẩu</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nhập mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nhập Lại Mật Khẩu</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {message && <Text>{message}</Text>}

          <TouchableOpacity onPress={handleRegister}>
            <View style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Đăng Ký</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AE7A51",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 15,
  },
  login: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    padding: 20,
  },
  title: {
    color: "#4B2C20",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  label: {
    paddingVertical: 10,
    color: "#4E8D7C",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderRadius: 15,
    paddingLeft: 10,
    color: "gray",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderRadius: 15,
    color: "gray",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  passwordInput: {
    color: "gray",
    height: 50,
    width: "90%",
    borderRadius: 15,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: "#4B2C20",
    width: "80%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
  },
  registerButtonText: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 20,
  },
});

export default RegisterScreen;
