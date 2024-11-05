import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../image/HinhGioiThieu/logo.png')}
      />
      
      <View style={styles.login}>
        <Text style={styles.title}>Nhập mã</Text>
        
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../image/HinhGioiThieu/nhieuhatcaphe.png')} />
        </View>

        <Text style={styles.label}>Vui lòng nhập mã từ email mà chúng tôi đã gửi</Text>
        
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              maxLength={1}
              keyboardType="numeric"
            />
          ))}
        </View>

        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Gửi mã</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#AE7A51',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 15,
  },
  login: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    padding: 20,
  },
  title: {
    color: '#4B2C20',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#4B2C20',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily:"Roboto",
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#4B2C20',
    width: '80%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
  },
});

export default OTPScreen;
