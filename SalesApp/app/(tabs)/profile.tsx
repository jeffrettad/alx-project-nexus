import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchProfile, logout } from '../../redux/authSlice';
import { logout as logoutApi } from '../../services/authService';

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, access, refresh, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Load profile when screen opens (if not already loaded)
  useEffect(() => {
    if (access && !user) {
      dispatch(fetchProfile(access));
    }
  }, [access]);

  const handleLogout = async () => {
    try {
      if (refresh) {
        await logoutApi(refresh); // Call your /auth/logout/
      }

      dispatch(logout()); // Clear Redux
      router.dismissAll();
      router.push('/signin');
    } catch (error) {
      Alert.alert("Logout Error", "You have been logged out locally.");
      dispatch(logout());
      router.push('/signin');
    }
  };

  // While loading profile
  if (loading && !user) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{
          uri:
            user?.profile_picture ||
            "https://www.gravatar.com/avatar/?d=mp"
        }}
        style={styles.profileImage}
      />

      {/* User Name */}
      <Text style={styles.name}>
        {user?.first_name || ''} {user?.last_name || ''}
      </Text>

      {/* User Email */}
      <Text style={styles.email}>{user?.email}</Text>

      {/* Buttons/Actions */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Order History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: Colors.red, // Red color for logout button
  },
});