import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import { useDispatch } from 'react-redux';
import FieldInput from '@/components/FieldInput';
import SocialBtn from '@/components/SocialBtn';
import { Colors } from '@/constants/Colors';
import { loginUser, fetchProfile } from '../redux/authSlice';
import type { AppDispatch } from '../redux/store';

const SignInScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // 1) Login user
      const res = await dispatch(
        loginUser({ email, password })
      ).unwrap();

      // 2) Fetch user profile using access token
      await dispatch(fetchProfile(res.access));

      // 3) Navigate to tabs ONLY after success
      router.dismissAll();
      router.push('/(tabs)');

    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Sign In' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Login to your Account</Text>

        <FieldInput
          placeholder='Email Address'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        <FieldInput
          placeholder='Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonTxt}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.loginTxt}>
          Don't have an account?{" "}
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginSpanTxt}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </Text>

        <View style={styles.divider} />

        <SocialBtn emailHref={'/signin'} />
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20
  },
  buttonTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
  },
  loginSpanTxt: {
    color: Colors.primary,
    fontWeight: '600',
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginBottom: 30,
  }
});
