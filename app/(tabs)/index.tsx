import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Search, Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductService } from '@/services/productService';
import { CategoryService } from '@/services/categoryService';
import { ProductCard } from '@/components/ProductCard';
import { Category } from '@/types';

export default function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      const featuredData = await ProductService.getFeaturedProducts();
      const popularData = await ProductService.getPopularProducts();
      const categoriesData = await CategoryService.getCategories();
      
      setFeaturedProducts(featuredData);
      setPopularProducts(popularData);
      setCategories(categoriesData);
    };
    
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={24} color="#6F4E37" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#6F4E37" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.promoCardContainer}>
          <View style={styles.promoCard}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Get 50% off</Text>
              <Text style={styles.promoDescription}>
                on your first order from our coffee shop!
              </Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" }}
              style={styles.promoImage}
            />
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === 'all' && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'all' && styles.selectedCategoryText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity onPress={() => router.push('/menu')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => router.push(`/product/${product.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity onPress={() => router.push('/menu')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={popularProducts.slice(0, 3)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                horizontal
                onPress={() => router.push(`/product/${item.id}`)}
              />
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8C8C8C',
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#6F4E37',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promoCardContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  promoCard: {
    flexDirection: 'row',
    backgroundColor: '#6F4E37',
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  promoTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  promoDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#6F4E37',
  },
  promoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#6F4E37',
    marginLeft: 24,
    marginBottom: 16,
  },
  categoriesList: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategory: {
    backgroundColor: '#6F4E37',
  },
  categoryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6F4E37',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  productsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  seeAllText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#996633',
  },
  productsList: {
    paddingLeft: 24,
    paddingRight: 8,
  },
});