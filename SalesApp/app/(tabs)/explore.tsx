import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker'; 
import axios from 'axios';
import { addToCart } from '@/redux/cartSlice';
import { Colors } from '@/constants/Colors';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const ExploreScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(['all', ...response.data]);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryFilter = selectedCategory === 'all' ? '' : `category=${selectedCategory}&`;
        const response = await axios.get(
          `https://fakestoreapi.com/products?${categoryFilter}_limit=10&_page=${page}`
        );
        setProducts((prev) => [...prev, ...response.data]);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, page]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const loadMoreData = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      {/* Display Product Image */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}> ₦{item.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Products</Text>

      {/* Category Filter */}
      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {categories.map((category, index) => (
          <Picker.Item label={category} value={category} key={index} />
        ))}
      </Picker>

      {/* Product List */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys for each item
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color={Colors.primary} /> : null}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      {/* Handle empty state */}
      {!loading && products.length === 0 && (
        <Text style={styles.emptyMessage}>No products found in this category.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  productCard: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 5,
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 18,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20, // Ensure there is space at the bottom of the list for footer
  },
});

export default ExploreScreen;

