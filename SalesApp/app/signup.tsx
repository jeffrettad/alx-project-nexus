import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import FieldInput from '@/components/FieldInput';
import SocialBtn from '@/components/SocialBtn';
import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type Props = {};

const SignUpScreen = (props: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Prepare data for backend
    const signupData = { fullName, email, password, gender };
    console.log('Signup data ready to send:', signupData);
    alert('Account created! (Ready for backend integration)');
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Sign Up' }} />

      <FieldInput
        placeholder="Full Name"
        placeholderTextColor={Colors.gray}
        autoCapitalize="words"
        value={fullName}
        onChangeText={setFullName}
      />

      <FieldInput
        placeholder="Email Address"
        placeholderTextColor={Colors.gray}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <FieldInput
        placeholder="Password"
        placeholderTextColor={Colors.gray}
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />

      <FieldInput
        placeholder="Confirm Password"
        placeholderTextColor={Colors.gray}
        secureTextEntry={!showPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.showPasswordBtn}
      >
        <Text style={{ color: Colors.primary }}>
          {showPassword ? 'Hide Passwords' : 'Show Passwords'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonTxt}>Create your account</Text>
      </TouchableOpacity>

      <Text style={styles.loginTxt}>
        Already have an account?{' '}
        <Link href="/signin" asChild>
          <TouchableOpacity>
            <Text style={styles.loginSpanTxt}>Sign in</Text>
          </TouchableOpacity>
        </Link>
      </Text>

      <View style={styles.divider} />

      <SocialBtn emailHref={'/signin'} />
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
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
  },
  picker: {
    marginVertical: 12,
  },
  showPasswordBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
});
