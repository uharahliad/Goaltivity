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
  FlatList,
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
      alignItems: 'flex-end',
    },
    form: {
      alignItems: 'center',
      //   backgroundColor: 'rgb(58, 58, 60)',
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
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      color: '#1D2E54',
      flex: 1,
    },
    title: {
      color: '#1D2E54',
      fontSize: 32,
      //   fontWeight: '700',
      lineHeight: 44,
    },
  });
}

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const SignUp = ({navigation}) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const {control, handleSubmit, formState, reset} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    try {
      const token = await auth.register(data);
      console.log(token.data);
      await EncryptedStorage.setItem('user', JSON.stringify({...token.data}));
      reset();
      navigation.navigate('Survey');
      // dispatch(setSignIn(true));
    } catch (e) {
      console.log(e);
      Alert.alert('Invalid credentials, try again');
    }
  };
  console.log(formState);
  const styles = useStyles();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.title}>Let's </Text>
              <Text style={{...styles.title, fontWeight: '700'}}>start</Text>
            </View>
            <SizedBox height={20} />
            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{required: true}}
                  render={props => (
                    <TextInput
                      {...props}
                      label="First Name"
                      placeholder="Add Name"
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
            <SizedBox height={40} />
            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{required: true}}
                  render={props => (
                    <TextInput
                      {...props}
                      label="Last Name"
                      placeholder="Add Last Name"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="firstName"
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
            <SizedBox height={40} />
            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="phoneNumber"
                  rules={{
                    required: true,
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                      message: 'Wrong format',
                    },
                  }}
                  render={props => (
                    <TextInput
                      {...props}
                      label="Phone Number"
                      placeholder="Add Phone"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="secondName"
                      autoCorrect={false}
                      keyboardType="numeric"
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
            <SizedBox height={10} />
            {formState.errors.phoneNumber?.message && (
              <Text style={{marginLeft: 15, color: 'red'}}>
                {formState.errors.phoneNumber.message}
              </Text>
            )}
            <SizedBox height={40} />
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
            <SizedBox height={10} />
            {formState.errors.email?.message && (
              <Text style={{marginLeft: 15, color: 'red'}}>
                {formState.errors.email.message}
              </Text>
            )}
            <SizedBox height={40} />
            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  rules={{required: true, minLength: 6}}
                  name="password"
                  render={props => (
                    <TextInput
                      {...props}
                      label="Password"
                      placeholder="Password must be 6 characters long"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      onChangeText={text => props.field.onChange(text)}
                      secureTextEntry
                      underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      activeUnderlineColor="#1D2E54"
                      mode="flat"
                      textContentType="password"
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
            <SizedBox height={10} />
            {formState.errors.password?.message && (
              <Text style={{marginLeft: 15, color: 'red'}}>
                {formState.errors.password.message}
              </Text>
            )}

            <SizedBox height={70} />

            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Create Account</Text>
              </View>
            </TouchableOpacity>
            <SizedBox height={40} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
