import { View, Text, Image, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1162455/pexels-photo-1162455.jpeg' }}
        style={styles.emptyImage}
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
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});