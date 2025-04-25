import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Star, Heart, ShoppingBag } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductService } from '@/services/productService';
import { CartService } from '@/services/cartService';
import { FavoriteService } from '@/services/favoriteService';
import { formatCurrency } from '@/utils/formatCurrency';
import ReviewCard from '@/components/ReviewCard';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductData = async () => {
      if (id) {
        const productData = await ProductService.getProductById(id);
        setProduct(productData);
        
        const productReviews = await ProductService.getProductReviews(id);
        setReviews(productReviews);
        
        const favoriteStatus = await FavoriteService.isFavorite(id);
        setIsFavorite(favoriteStatus);
      }
    };
    
    loadProductData();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      const cartItem = { ...product, quantity };
      await CartService.addToCart(cartItem);
      router.push('/(tabs)/cart');
    }
  };

  const handleToggleFavorite = async () => {
    if (product) {
      if (isFavorite) {
        await FavoriteService.removeFavorite(product.id);
      } else {
        await FavoriteService.addFavorite(product);
      }
      setIsFavorite(!isFavorite);
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#6F4E37" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Product Details</Text>
          
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFavorite && styles.favoriteButtonActive,
            ]}
            onPress={handleToggleFavorite}
          >
            <Heart
              size={20}
              color={isFavorite ? '#FFFFFF' : '#6F4E37'}
              fill={isFavorite ? '#FFFFFF' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
          />
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.productNameRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  color="#FFD700"
                  fill={star <= product.rating ? '#FFD700' : 'transparent'}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </Text>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
          
          <View style={styles.sizeContainer}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptions}>
              <TouchableOpacity style={[styles.sizeButton, styles.sizeButtonActive]}>
                <Text style={[styles.sizeButtonText, styles.sizeButtonActiveText]}>S</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>L</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {reviews.length > 0 && (
            <View style={styles.reviewsContainer}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              {reviews.slice(0, 2).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              {reviews.length > 2 && (
                <TouchableOpacity style={styles.allReviewsButton}>
                  <Text style={styles.allReviewsButtonText}>See All Reviews</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ShoppingBag size={20} color="#FFFFFF" />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#8C8C8C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#6F4E37',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  productImage: {
    width: 240,
    height: 240,
    borderRadius: 16,
  },
  detailsContainer: {
    paddingHorizontal: 24,
  },
  productNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
    flex: 1,
  },
  productPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#6F4E37',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8C8C8C',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  sizeContainer: {
    marginBottom: 24,
  },
  sizeOptions: {
    flexDirection: 'row',
  },
  sizeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#FFFFFF',
  },
  sizeButtonActive: {
    backgroundColor: '#6F4E37',
    borderColor: '#6F4E37',
  },
  sizeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#6F4E37',
  },
  sizeButtonActiveText: {
    color: '#FFFFFF',
  },
  reviewsContainer: {
    marginBottom: 24,
  },
  allReviewsButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  allReviewsButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#6F4E37',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#6F4E37',
  },
  quantityText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    paddingHorizontal: 16,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6F4E37',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  addToCartButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});