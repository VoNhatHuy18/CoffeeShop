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
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width } = Dimensions.get("window");

const drinks = [
  {
    id: "1",
    name: "Espresso",
    image: require("../image/HinhGioiThieu/Espresso.png"),
  },
  {
    id: "2",
    name: "Latte",
    image: require("../image/HinhGioiThieu/Latte.png"),
  },
  {
    id: "3",
    name: "Cà Phê",
    image: require("../image/HinhGioiThieu/Coffee.png"),
  },
  { id: "4", name: "Trà", image: require("../image/HinhGioiThieu/Tra.png") },
  { id: "5", name: "Bánh", image: require("../image/HinhGioiThieu/Banh.png") },
];

const images = [
  require("../image/HinhGioiThieu/coffeeBanner1.png"),
  require("../image/HinhGioiThieu/coffeeBanner2.png"),
  require("../image/HinhGioiThieu/coffeeBanner3.png"),
  require("../image/HinhGioiThieu/coffeeBanner4.png"),
];

const ProductScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coffeely, setCoffeesly] = useState([]);
  const [coffeegoi, setCoffeesgoi] = useState([]);

  const APIcoffeely = "https://673151eb7aaf2a9aff105a1b.mockapi.io/caphely";
  const fetchCoffeesly = async () => {
    const respone = await axios.get(APIcoffeely);
    setCoffeesly(respone.data);
  };

  useEffect(() => {
    fetchCoffeesly();
  }, []);

  const APIcoffeegoi =
    "https://65726345d61ba6fcc014b530.mockapi.io/api/Caphegoi ";
  const fetchCoffeesgoi = async () => {
    const respone = await axios.get(APIcoffeegoi);
    setCoffeesgoi(respone.data);
  };

  useEffect(() => {
    fetchCoffeesgoi();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const rendercoffeely = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Coffee", {
          image: item.Image,
          name: item.Name,
          price: item.price,
        })
      }
    >
      <Image source={{ uri: item.Image }} style={styles.imageCoffee} />
      <Text>{item.Name}</Text>
      <Text>{item.price}</Text>
    </TouchableOpacity>
  );

  const rendercoffeegoi = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CoffeePack", {
          image: item.Image,
          name: item.Name,
          price: item.price,
        })
      }
    >
      <Image source={{ uri: item.Image }} style={styles.imageCoffee} />
      <Text>{item.Name}</Text>
      <Text>{item.price}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    try {
      // Clear all user data in AsyncStorage
      await AsyncStorage.clear();
      Alert.alert("Logout Successful", "You have been logged out.");

      // Navigate to the Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Logout Error", "Failed to log out. Please try again.");
    }
  };

  const handleGoToCart = () => {
    // Navigate to CartScreen with the cart items (if any)
    navigation.navigate("Cart", { cartItems: [] }); // Pass any necessary data
  };

  return (
    <LinearGradient
      colors={["#AE7A51", "#AE7A51", "#AE7A51", "#AE7A51", "#AE7A51", "#fff"]}
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
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={handleGoToCart}
                >
                  <Feather name="shopping-bag" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                  <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.componentHello}>
              <Text style={styles.textHello}>Cà Phê Đá</Text>
              <Text style={styles.textHello}>Xin Chào !</Text>
            </View>
          </ImageBackground>

          <Swiper
            autoplay={true}
            autoplayTimeout={3}
            loop={true}
            dotStyle={styles.dot}
            containerStyle={styles.swiperContainer}
          >
            {images.map((image, index) => (
              <View style={styles.imageContainer} key={index}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </Swiper>
          <Text
            style={{ fontFamily: "Roboto", color: "#583732", fontSize: 35 }}
          >
            Menu
          </Text>

          <View style={styles.menuContainer}>
            <FlatList
              data={drinks}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity style={styles.itemContainer}>
                    <Image source={item.image} style={styles.imageMenu} />
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <FlatList
            data={coffeely}
            renderItem={rendercoffeely}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#583732", fontSize: 30, marginRight: 5 }}>
              {" "}
              Cà phê gói
            </Text>
            <Image source={require("../image/HinhGioiThieu/caphe.png")} />
          </View>
          <FlatList
            data={coffeegoi}
            renderItem={rendercoffeegoi}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </SafeAreaView>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Menu Options</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  width: 120,
                }}
              >
                <Image
                  source={{ uri: "https://picsum.photos/200" }}
                  style={{ height: 20, width: 20, borderRadius: 50 }}
                />
                <Text>Tài khoản</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  width: 120,
                }}
                onPress={handleGoToCart}
              >
                <Feather name="package" size={20} color="black" />
                <Text>Đơn hàng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  width: 120,
                }}
              >
                <Ionicons name="help-circle-outline" size={20} color="black" />
                <Text>Về chúng tôi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  width: 120,
                }}
                onPress={handleLogout}
              >
                <Ionicons name="log-in-outline" size={20} color="black" />
                <Text>Đăng xuất</Text>
              </TouchableOpacity>

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
    padding: 5,
  },
  iconCoffee: {
    width: 25,
    height: 30,
    margin: 5,
  },
  imageBackground: {
    height: 150,
    width: 250,
    justifyContent: "center",
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
    marginLeft: 165,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF5E9",
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
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#AE7A51",
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },

  textHello: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 10,
    fontFamily: "Roboto",
  },

  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 180,
    borderRadius: 10,
  },
  dot: {
    backgroundColor: "black",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  swiperContainer: {
    height: 180,
  },
  menuContainer: {
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A0522D",
    height: 35,
    width: 60,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  imageMenu: {
    width: 15,
    height: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
  card: {
    width: "50%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "#F7BA8326",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageCoffee: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 15,
  },
});

export default ProductScreen;
