import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
} from 'react-native';

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#1D2E54',
      borderRadius: 100,
      height: 48,
      justifyContent: 'center',
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '510',
      lineHeight: 20,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
    },
    label: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 80,
    },
    root: {
      backgroundColor: 'white',
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
    subtitle: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
    },
    textButton: {
      color: 'black',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      color: '#FFFFFF',
      flex: 1,
    },
    title: {
      color: '#1D2E54',
      fontSize: 32,
      //   fontWeight: '700',
      lineHeight: 44,
    },
    loginButtonText: {
      color: '#8DC63F',
      fontSize: 14,
      fontWeight: '510',
      lineHeight: 20,
    },
    // logo: {
    //   position: 'absolute',
    //   top: 20,
    //   left: 10,
    // },
  });
}

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const Welcome = ({navigation}) => {
  const styles = useStyles();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <Image
              style={styles.logo}
              source={require('D:/goals/Goaltivity/assets/BrandStyleGuide_Goaltivity.png')}
            />
            <SizedBox height={Dimensions.get('screen').height * 0.04} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.title}>This is </Text>
              <Text style={{...styles.title, fontWeight: '700'}}>
                about the app
              </Text>
            </View>
            <SizedBox height={Dimensions.get('screen').height * 0.52} />
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.textButton}>Already have an account? </Text>
              <SizedBox height={Dimensions.get('screen').height * 0.1} />
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <View>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Welcome;
