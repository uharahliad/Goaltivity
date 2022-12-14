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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import auth from '../../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../../redux/reducers/signInSlice';

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#1D2E54',
      borderRadius: 100,
      height: 48,
      justifyContent: 'center',
    },
    disabledButton: {
      alignItems: 'center',
      backgroundColor: 'lightgrey',
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
    disabledButtonTitle: {
      color: 'grey',
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
      color: 'black',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
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
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
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

const ForgotPassword = ({navigation}) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const {control, handleSubmit, formState, getFieldState, reset} = useForm({
    // defaultValues: {
    //   email: '',
    // },
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      console.log(data);
      createTwoButtonAlert(data.email);
      reset();
    } catch (e) {
      console.log(e, e.code);
      Alert.alert('Invalid credentials, try again');
    }
  };

  const createTwoButtonAlert = email =>
    Alert.alert('Check Your Email', `We have sent an email to ${email}`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

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
            <SizedBox height={70} />
            <Text style={styles.title}>Forgot your password?</Text>

            <SizedBox height={30} />

            <Text style={styles.subtitle}>
              Enter your email address to receive a link to reset your password
            </Text>

            <SizedBox height={50} />

            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={props => (
                    <TextInput
                      {...props}
                      label="Email Address"
                      placeholder="Add Email Address"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      activeUnderlineColor="#1D2E54"
                      mode="flat"
                      onChangeText={text => props.field.onChange(text)}
                      textContentType="username"
                      style={{
                        backgroundColor:
                          '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                        borderColor: '#1D2E54',
                        borderRadius: 8,
                      }}
                    />
                  )}
                />
              </View>
            </Pressable>
            {formState.errors.email?.message && (
              <Text style={{marginLeft: 15, color: 'red'}}>
                {formState.errors.email.message}
              </Text>
            )}

            <SizedBox height={250} />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={getFieldState('email').invalid !== true ? false : true}>
              <View
                style={
                  getFieldState('email').invalid !== true
                    ? styles.button
                    : styles.disabledButton
                }>
                <Text
                  style={
                    getFieldState('email').invalid !== true
                      ? styles.buttonTitle
                      : styles.disabledButtonTitle
                  }>
                  Send Email
                </Text>
              </View>
            </TouchableOpacity>
            <SizedBox height={16} />
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.textButton}>back to </Text>
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

export default ForgotPassword;
