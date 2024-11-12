import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CoffeeScreen = ({ route, navigation }) => {
  const { image, name, price } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cartItems");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Failed to load cart items:", error);
      }
    };
    loadCart();
  }, []);

  const handleAddToCart = async () => {
    try {
      const isCheckoutComplete = await AsyncStorage.getItem(
        "isCheckoutComplete"
      );

      let updatedCart;
      if (isCheckoutComplete === "true") {
        // Reset cart if checkout was completed
        updatedCart = [{ image, name, price, quantity }];
        await AsyncStorage.setItem("isCheckoutComplete", "false"); // Reset the flag
      } else {
        updatedCart = [...cartItems, { image, name, price, quantity }];
      }

      setCartItems(updatedCart);
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCart));

      Alert.alert("Thông Báo", "Đã thêm vào giỏ hàng!");
      navigation.navigate("Products");
    } catch (error) {
      console.error("Failed to save cart items:", error);
    }
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={["#AE7A51", "#AE7A51", "#AE7A51", "#AE7A51", "#fff"]}
        style={styles.container}
      >
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.productImage} />
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>{price} VNĐ</Text>
          <Text style={styles.description}>
            Là hương vị nguyên bản của những hạt cà phê Arabica
          </Text>
          <View>
            <Text style={styles.buttonText}>Số Lượng</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.cartText}>Thêm Vào Giỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyNowButton}
              // onPress={() => navigation.navigate("Pay")}
            >
              <Text style={styles.buyText}>Mua Ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginBottom: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#583732",
  },
  productPrice: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  button: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#333",
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addToCartButton: {
    backgroundColor: "#AE7A51",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buyNowButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#AE7A51",
    width: "45%",
    alignItems: "center",
  },
  buyText: {
    color: "#AE7A51",
    fontWeight: "bold",
  },
  cartText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CoffeeScreen;
