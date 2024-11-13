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
import Checkbox from "expo-checkbox"; // Assuming you're using expo-checkbox

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("cartItems");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart).map((item) => ({
          ...item,
          selected: false, // Add selected state to each item
        }));
        setCartItems(parsedCart);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart items:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const handleCheckout = async () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      Alert.alert("Giỏ hàng của bạn đang trống!");
      return;
    } else {
      try {
        await AsyncStorage.removeItem("cartItems");
        setCartItems([]);
        setTotalPrice(0);
        Alert.alert("Thông Báo", "Thanh toán thành công!");
        navigation.navigate("Products");
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

  const toggleSelectItem = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem === item
        ? { ...cartItem, selected: !cartItem.selected }
        : cartItem
    );
    setCartItems(updatedCartItems);

    const calculatedTotal = updatedCartItems.reduce((total, cartItem) => {
      if (cartItem.selected) {
        const itemPrice = parseInt(cartItem.price) || 0;
        const itemQuantity = parseInt(cartItem.quantity) || 0;
        return total + itemPrice * itemQuantity;
      }
      return total;
    }, 0);
    setTotalPrice(calculatedTotal);
  };

  const handleDeleteSelectedItems = async () => {
    const updatedCartItems = cartItems.filter((item) => !item.selected);
    setCartItems(updatedCartItems);
    setTotalPrice(0);

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
          <Checkbox
            value={item.selected}
            onValueChange={() => toggleSelectItem(item)}
            style={styles.checkbox}
          />
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

      {cartItems.some((item) => item.selected) && (
        <TouchableOpacity
          style={styles.deleteSelectedButton}
          onPress={handleDeleteSelectedItems}
        >
          <Text style={styles.deleteSelectedText}>Xóa Sản Phẩm Đã Chọn</Text>
        </TouchableOpacity>
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
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
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
  deleteSelectedButton: {
    backgroundColor: "#FF4C4C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  deleteSelectedText: {
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
});

export default CartScreen;
