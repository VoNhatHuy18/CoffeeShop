import { View, Text, Image } from "react-native";
import React from "react";

const CartScreen = ({ route }) => {
  const { image, name, price } = route.params;
  return (
    <View>
      <Image source={{ uri: image }} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price} VNĐ</Text>
    </View>
  );
};

export default CartScreen;
