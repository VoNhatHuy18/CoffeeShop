import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../image/HinhGioiThieu/logo.png')}
      />
      <View style={styles.login}>
        <Text
          style={{
            color: '#4B2C20',
            fontFamily: 'Times New Roman ',
            fontWeight: 'bold',
            fontSize: 30,
            padding: 5,
            textAlign: 'center',
          }}>
          Quên mật khẩu
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../image/HinhGioiThieu/nhieuhatcaphe.png')} />
        </View>

        <Text
          style={{
            padding: 10,
            color: '#4E8D7C',
            fontSize: 15,
            fontWeight: 'bold',
            fontFamily: 'Times New Roman',
          }}>
          Email
        </Text>
        <TextInput
          style={{
            height: 50,
            width: '80% ',
            borderColor: 'gray',
            borderRadius: 15,
            alignSelf: 'center',
            paddingLeft: 10,
            color: 'gray',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          placeholder="Nhập Email"></TextInput>

        <TouchableOpacity onPress={() => navigation.navigate()}>
          <View
            style={{
              backgroundColor: '#4B2C20',
              width: '80%',
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical:80,
              position:'absolute'
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Times New Roman',
                fontSize: 20,
              }}>
              Gửi mã
            </Text>
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
    height: 100,
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
 
});

export default ForgotPasswordScreen;
