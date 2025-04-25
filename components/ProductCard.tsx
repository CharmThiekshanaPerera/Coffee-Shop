import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, Plus } from 'lucide-react-native';
import { formatCurrency } from '@/utils/formatCurrency';
import { FavoriteService } from '@/services/favoriteService';
import { CartService } from '@/services/cartService';

export interface ProductCardProps {
  product: any;
  horizontal?: boolean;
  onPress: () => void;
}

export function ProductCard({ product, horizontal = false, onPress }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    
    if (isFavorite) {
      await FavoriteService.removeFavorite(product.id);
    } else {
      await FavoriteService.addFavorite(product);
    }
    
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    await CartService.addToCart({ ...product, quantity: 1 });
  };

  if (horizontal) {
    return (
      <TouchableOpacity style={styles.horizontalCard} onPress={onPress}>
        <Image
          source={{ uri: product.image }}
          style={styles.horizontalImage}
        />
        
        <View style={styles.horizontalContent}>
          <View style={styles.horizontalTopRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <Heart
                size={16}
                color="#FF6B6B"
                fill={isFavorite ? '#FF6B6B' : 'transparent'}
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.horizontalCategory}>{product.categoryName}</Text>
          
          <View style={styles.horizontalBottomRow}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
            >
              <Plus size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleToggleFavorite}
      >
        <Heart
          size={16}
          color="#FF6B6B"
          fill={isFavorite ? '#FF6B6B' : 'transparent'}
        />
      </TouchableOpacity>
      
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />
      
      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Plus size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    marginBottom: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#6F4E37',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6F4E37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  horizontalImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  horizontalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  horizontalCategory: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8C8C8C',
  },
  horizontalBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});