import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
type Props = {};

const ProfileScreen = (props: Props) => {
  // Placeholder user data
  const user = {
    name: "Adedokun Adesoye ",
    email: "adedokunadesoye@gmail.com",
    profilePicture: "https://imgur.com/a/VR3rljB.png",
  };
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
      
      {/* User Name */}
      <Text style={styles.name}>{user.name}</Text>
      
      {/* User Email */}
      <Text style={styles.email}>{user.email}</Text>
      
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

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
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