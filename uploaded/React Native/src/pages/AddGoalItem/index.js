import React, {useEffect, useState} from 'react';
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
import goals from '../../api/goals';
import goalCategories from '../../api/goalCategories';
import successCriteria from '../../api/successCriteria';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../../redux/reducers/signInSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {current} from '@reduxjs/toolkit';

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

const categories = [
  'Career/Business',
  'Family & Relationships',
  'Personal Growth',
  'Health',
  'Recreation/Leisure',
];

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const AddGoalItem = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [criteria, setCriteria] = useState('');
  const [criteriaItems, setCriteriaItems] = useState([]);
  const [items, setItems] = useState([
    {
      label: 'Career/Business',
      value: 'Career/Business',
    },
    {label: 'Family & Relationships', value: 'Family & Relationships'},
    {label: 'Personal Growth', value: 'Personal Growth'},
    {label: 'Health', value: 'Health'},
    {label: 'Recreation/Leisure', value: 'Recreation/Leisure'},
  ]);
  const dispatch = useDispatch();

  console.log(value[0]);

  const {control, handleSubmit, formState, getValues} = useForm({
    defaultValues: {
      goalName: '',
      reason: '',
      award: '',
    },
  });

  useEffect(() => {
    if (startDate) {
      const copyDate = new Date(startDate.getTime());
      setEndDate(new Date(copyDate.setDate(copyDate.getDate() + 90)));
    }
  }, [startDate]);

  const onSubmit = async data => {
    // console.log(data, criteriaItems, items, 111111111);
    const currentUser = JSON.parse(await EncryptedStorage.getItem('user'));
    try {
      console.log(
        currentUser.token,
        data.goalName,
        items,
        data.award,
        data.reason,
        startDate,
        endDate,
      );
      const newGoal = await goals.createGoal(
        {
          data: {
            name: data.goalName,
            goalCategory: {name: value[0]},
            successCriteria: criteriaItems,
            author: currentUser.email,
            award: data.award,
            reason: data.reason,
            startDate,
            endDate,
            status: '0',
          },
        },
        currentUser.token,
      );
      console.log(newGoal.data);
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    }
  };
  const onSubmitEditing = () => {
    setCriteriaItems(current => [
      ...current,
      {successCriteria: criteria, value: criteria},
    ]);
    setCriteria('');
  };
  const handleClick = data => {
    setCriteriaItems(current =>
      current.filter(obj => {
        return obj.value !== data.value;
      }),
    );
  };
  //   console.log(formState, criteriaItems, items, startDate, endDate);
  //   console.log(getValues('award'));
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
                  name="goalName"
                  rules={{required: true}}
                  render={props => (
                    <TextInput
                      {...props}
                      label="Goal Name"
                      placeholder="Add Goal"
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable onPress={target => target.current?.focus()}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TextInput
                      value={startDate.toLocaleDateString()}
                      disabled
                      label="Start Date"
                      placeholder="Add Start Date"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="firstName"
                      autoCorrect={false}
                      keyboardType="email-address"
                      underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      activeUnderlineColor="#1D2E54"
                      mode="flat"
                      onChange={e => setStartDate(e.target.value)}
                      textContentType="date"
                      style={{
                        backgroundColor:
                          '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                        borderColor: '#1D2E54',
                        borderRadius: 8,
                        width: 120,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => setDateOpen(true)}
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Icon name="date-range" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
              <SizedBox height={40} />
              <Pressable onPress={target => target.current?.focus()}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TextInput
                      value={
                        endDate !== null ? endDate.toLocaleDateString() : ''
                      }
                      disabled
                      label="End Date"
                      placeholder="Add End Date"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="secondName"
                      autoCorrect={false}
                      keyboardType="numeric"
                      underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      activeUnderlineColor="#1D2E54"
                      mode="flat"
                      textContentType="username"
                      style={{
                        backgroundColor:
                          '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                        borderColor: '#1D2E54',
                        borderRadius: 8,
                        width: 120,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Icon name="date-range" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </View>
            <SizedBox height={40} />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              mode="BADGE"
              max={1}
            />
            {/* <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="category"
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
                      label="Category"
                      placeholder="Select Category"
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
            </Pressable> */}
            <SizedBox height={40} />
            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  rules={{required: true}}
                  name="reason"
                  render={props => (
                    <TextInput
                      {...props}
                      label="I must complete this goal..."
                      placeholder="text"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      onChangeText={text => props.field.onChange(text)}
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

            <SizedBox height={20} />

            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <TextInput
                  label="Success Criteria"
                  placeholder="Set Success Criteria"
                  placeholderTextColor="#1D2E54"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  autoCorrect={false}
                  onChangeText={text => setCriteria(text)}
                  underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                  activeUnderlineColor="#1D2E54"
                  mode="flat"
                  value={criteria}
                  onSubmitEditing={() => onSubmitEditing()}
                  textContentType="password"
                  style={{
                    backgroundColor:
                      '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                    borderColor: '#1D2E54',
                    borderRadius: 8,
                  }}
                />
              </View>
            </Pressable>
            <SizedBox height={5} />
            <View style={{flexDirection: 'row'}}>
              {!!criteriaItems &&
                criteriaItems.map((item, i) => (
                  <View key={i} style={{flexDirection: 'row'}}>
                    <Text>{item.value}</Text>
                    <TouchableOpacity onPress={() => handleClick(item)}>
                      <Icon name="close" size={30} />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
            <SizedBox height={20} />

            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  rules={{required: true}}
                  name="award"
                  render={props => (
                    <TextInput
                      {...props}
                      label="Award for completing this goal"
                      placeholder="Award for completing this goal..."
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      onChangeText={text => props.field.onChange(text)}
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
            <SizedBox height={20} />

            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Create</Text>
              </View>
            </TouchableOpacity>
            <DatePicker
              mode="date"
              modal
              open={dateOpen}
              date={startDate}
              onDateChange={setStartDate}
              onConfirm={date => {
                console.log(date);
                setDateOpen(false);
                setStartDate(date);
              }}
              onCancel={() => {
                setDateOpen(false);
              }}
            />
            <SizedBox height={40} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddGoalItem;
