import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const CartScreen = ({ route }) => {
  const [cartItems, setCartItems] = useState(route.params.cartItems || []);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever cartItems changes
  useEffect(() => {
    const calculatedTotal = cartItems.reduce((total, item) => {
      const itemPrice = parseInt(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;

      console.log("Item:", item);
      console.log("Parsed Price:", itemPrice);
      console.log("Parsed Quantity:", itemQuantity);

      return total + itemPrice * itemQuantity;
    }, 0);

    console.log("Total Price:", calculatedTotal);
    setTotalPrice(calculatedTotal);
  }, [cartItems]);

  // Handle delete item
  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const renderRightActions = (index) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(index)}
    >
      <Text style={styles.deleteText}>Xóa</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <Swipeable renderRightActions={() => renderRightActions(index)}>
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDetails}>Phân Loại: Cà Phê Gói</Text>
          <Text style={styles.productPrice}>Giá: {item.price} VNĐ</Text>
          <Text style={styles.productQuantity}>Số Lượng: {item.quantity}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ Hàng</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng: {totalPrice}.000 VNĐ</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
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
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#583732",
  },
  productDetails: {
    fontSize: 14,
    color: "#583732",
  },
  productPrice: {
    fontSize: 14,
    color: "#583732",
  },
  productQuantity: {
    fontSize: 14,
    color: "#583732",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#583732",
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
});

export default CartScreen;
