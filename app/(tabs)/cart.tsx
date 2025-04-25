import { View, Text, Image, StyleSheet } from 'react-native';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1162455/pexels-photo-1162455.jpeg' }}
        style={styles.emptyCartImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});