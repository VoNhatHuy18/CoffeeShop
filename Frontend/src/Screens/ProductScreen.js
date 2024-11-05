import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";

const ProductScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <LinearGradient
      colors={["#AE7A51", "#AE7A51", "#fff"]}
      style={styles.container}
    >
      <ScrollView>
        <SafeAreaView>
          <ImageBackground
            source={require("../image/HinhGioiThieu/imageBackground.png")}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <View style={styles.header}>
              <Image
                source={require("../image/HinhGioiThieu/coffee_icon.png")}
                style={styles.iconCoffee}
              />
              <View>
                <Text style={styles.textHeader1}>Cà Phê Đá</Text>
                <Text style={styles.textHeader2}>Chào bạn!</Text>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity style={{ marginHorizontal: 10 }}>
                  <Feather name="shopping-bag" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                  <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>

        {/* Modal for the popup */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Menu Options</Text>
              {/* Add your menu items here */}
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconCoffee: {
    width: 25,
    height: 30,
    margin: 5,
  },
  imageBackground: {
    height: 225,
    width: 220,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  textHeader1: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  textHeader2: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Roboto",
  },
  menu: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 180,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#AE7A51",
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductScreen;
