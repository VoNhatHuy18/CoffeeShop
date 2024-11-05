import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (!name) {
      Alert.alert(" Họ và tên không được để trống.");
      return;
    }

    if (!validatename(name)) {
      Alert.alert("Họ và tên có ký tự không hợp lệ.");
      return;
    }

    if (!email) {
      Alert.alert(" Email không được để trống.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Email không đúng định dạng.");
      return;
    }

    if (!password) {
      Alert.alert(" Mật khẩu không được để trống.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert("Mật khẩu phải trên 8 ký tự.");
      return;
    }

    if (!confirmPassword) {
      Alert.alert(" Xác nhận mật khẩu không được để trống.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    const userData = {
      name: name,
      email,
      password,
    };
    axios
      .post("http://192.168.1.20:5001/register", userData)
      .then((res) => {
        console.log("Server Response:", res.data); // Log the server response
        if (res.data.status == "ok") {
          // Show success alert
          Alert.alert("Đăng ký thành công");
          navigation.navigate("Login");
        } else {
          Alert.alert("Email đã được sử dụng. Vui lòng sử dụng email khác.");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      });
  };

  const validatename = (name) => {
    const nameRegex = /^[a-zA-Z1-9]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /.{8,}/;
    return passwordRegex.test(password);
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
            value={name}
            onChangeText={setName}
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
    height: "100%",
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    padding: 20,
  },
  title: {
    color: "#4B2C20",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  label: {
    paddingVertical: 10,
    color: "#4E8D7C",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  input: {
    height: 50,
    width: "100%",
    color: "gray",
    borderRadius: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 20,
    borderColor: "gray",
    backgroundColor: "#fff",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    fontFamily: "Roboto",
    fontSize: 20,
  },
});

export default RegisterScreen;
