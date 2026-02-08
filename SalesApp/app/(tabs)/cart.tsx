import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/cartSlice'; // 
import { Colors } from '@/constants/Colors';

const CartScreen = () => {
  const cartItems = useSelector((state: any) => state.cart.items); // Use useSelector to get cart items
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'You cannot proceed with the purchase because your cart is empty.');
      return;
    }

    // Logic for payment process
    Alert.alert(
      'Order Confirmation',
      'Your order has been placed successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            // After confirming the order, you can clear the cart if needed
            console.log('Order placed and cart cleared');
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      {/* Display the product image */}
      <Image source={{ uri: item.image }} style={styles.cartImage} />

      <View style={styles.cartDetails}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
        
        {/* Buttons container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFromCart(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={handleBuyNow}
          >
            <Text style={styles.buyNowButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
  },
  cartDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 5,
  },
  cartItemQuantity: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute buttons evenly
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: Colors.gray, // Soft gray for the remove button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // To make the button stretch on the left
    marginRight: 10, // Space between buttons
  },
  removeButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buyNowButton: {
    backgroundColor: Colors.primary, // Subtle purple for the "Buy Now" button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // To make the button stretch on the right
  },
  buyNowButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
});