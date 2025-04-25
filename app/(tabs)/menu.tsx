import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductService } from '@/services/productService';
import { CategoryService } from '@/services/categoryService';
import { ProductCard } from '@/components/ProductCard';
import { Category } from '@/types';

export default function MenuScreen() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const allProducts = await ProductService.getAllProducts();
      const categoriesData = await CategoryService.getCategories();
      
      setProducts(allProducts);
      setCategories(categoriesData);
    };
    
    loadData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Menu</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#8C8C8C" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search coffee..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6F4E37" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoriesContainer}>
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
      
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            horizontal
            onPress={() => router.push(`/product/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.productsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#6F4E37',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333333',
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoriesContainer: {
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
  productsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});