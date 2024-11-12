import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Swipeable } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  // const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("cartItems");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart items:", error);
    }
  };

  useEffect(() => {
    const calculatedTotal = cartItems.reduce((total, item) => {
      const itemPrice = parseInt(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);
    setTotalPrice(calculatedTotal);
  }, [cartItems]);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Giỏ hàng của bạn đang trống!");
      return;
    } else {
      try {
        await AsyncStorage.removeItem("cartItems");

        setCartItems([]);

        await AsyncStorage.setItem("isCheckoutComplete", "true");
        Alert.alert("Thông Báo", "Thanh toán thành công!");
        navigation.navigate("Products");
        // Navigate after setting state, ensuring that cartItems is emptied before navigating
        // navigation.navigate("Pay", { cartItems: [] });
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }
  };

  const handleDeleteItem = async (itemToDelete) => {
    const updatedCartItems = cartItems.filter((item) => item !== itemToDelete);
    setCartItems(updatedCartItems);

    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const renderItem = ({ item }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item)}
      >
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.cartItem}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productProperty}>
              Số lượng: {item.quantity}
            </Text>
            <Text style={styles.productProperty}>Giá: {item.price} VNĐ</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {isCartEmpty ? (
        <ImageBackground
          source={require("../image/HinhGioiThieu/Emptycart.png")}
          style={styles.imageBackground}
        >
          <Text style={styles.emptyCartMessage}>Giỏ hàng của bạn trống!</Text>
        </ImageBackground>
      ) : (
        <></>
      )}
      <Text style={styles.header}>Giỏ Hàng</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.totalText}>
            Tổng cộng: {totalPrice + ",000 VNĐ"}
          </Text>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống!</Text>
      )}

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5E1C6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#583732",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#F3D9B5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flexDirection: "column",
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#583732",
  },
  productProperty: {
    fontSize: 14,
    color: "#583732",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#583732",
    marginTop: 10,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#583732",
    textAlign: "center",
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: "#AE7A51",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    width: 80,
    borderRadius: 10,
  },
  deleteText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default CartScreen;
