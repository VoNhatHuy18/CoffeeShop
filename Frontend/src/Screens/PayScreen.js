import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const PayScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      setIsCartEmpty(true);
    } else {
      setIsCartEmpty(false);
    }
  }, [cartItems]);

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
        <>
          <Text style={styles.header}>Thanh Toán Thành Công!</Text>
          <Text style={styles.message}>
            Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.
          </Text>
        </>
      )}

      <TouchableOpacity
        style={[styles.button, isCartEmpty && styles.disabledButton]}
        onPress={() => {
          if (!isCartEmpty) {
            navigation.navigate("Products");
          }
        }}
        disabled={isCartEmpty}
      >
        <Text style={styles.buttonText}>
          {isCartEmpty
            ? "Không có sản phẩm để thanh toán"
            : "Quay lại trang chủ"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5E1C6",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  emptyCartMessage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#583732",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#583732",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#AE7A51",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#D9D9D9",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default PayScreen;
