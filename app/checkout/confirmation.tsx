import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { CircleCheck as CheckCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartService } from '@/services/cartService';
import { formatCurrency } from '@/utils/formatCurrency';

export default function OrderConfirmationScreen() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const loadOrderData = async () => {
      // Simulate an order being placed
      const items = await CartService.getCartItems();
      setOrderItems(items);
      
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setOrderTotal(total);
      
      // Generate a random order number
      setOrderNumber(`#${Math.floor(100000 + Math.random() * 900000)}`);
      
      // Clear the cart
      await CartService.clearCart();
    };
    
    loadOrderData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successContainer}>
          <View style={styles.checkCircle}>
            <CheckCircle size={50} color="#6F4E37" fill="#6F4E37" />
          </View>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.successDescription}>
            Your order has been placed successfully.
          </Text>
          <Text style={styles.orderNumber}>Order number: {orderNumber}</Text>
        </View>
        
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          {orderItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />
              <View style={styles.orderItemDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
              </View>
              <Text style={styles.productPrice}>
                {formatCurrency(item.price * item.quantity)}
              </Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>{formatCurrency(orderTotal)}</Text>
          </View>
        </View>
        
        <View style={styles.deliveryInfoContainer}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>123 Coffee Street, Brewville</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Estimated Delivery</Text>
            <Text style={styles.infoValue}>15-20 minutes</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>Credit Card (**** 1234)</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.trackOrderButton}
          onPress={() => {}}
        >
          <Text style={styles.trackOrderButtonText}>Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 24,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8D4B9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#6F4E37',
    marginBottom: 8,
  },
  successDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#8C8C8C',
    textAlign: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#6F4E37',
  },
  orderDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  orderItemDetails: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  productQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8C8C8C',
  },
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#6F4E37',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333333',
  },
  totalAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#6F4E37',
  },
  deliveryInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8C8C8C',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
  },
  trackOrderButton: {
    backgroundColor: '#6F4E37',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  trackOrderButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  continueShoppingButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6F4E37',
    marginBottom: 24,
  },
  continueShoppingButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#6F4E37',
  },
});