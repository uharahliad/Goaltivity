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
import Slider from '@react-native-community/slider';
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

const EditGoalItem = ({navigation, route}) => {
  const {goal, length} = route.params;
  console.log(goal);
  const [startDate, setStartDate] = useState(new Date(goal.start_date));
  const [endDate, setEndDate] = useState(new Date(goal.end_date));
  const [dateOpen, setDateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([goal.category.name] || []);
  const [criteria, setCriteria] = useState('');
  const [dataCriteria, setDataCriteria] = useState(null);
  const [criteriaItems, setCriteriaItems] = useState([]);
  const [slider, setSlider] = useState(Number(goal.status));
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

  const {control, handleSubmit, formState, getValues, reset} = useForm({
    defaultValues: {
      goalName: goal.name,
      reason: goal.reason,
      award: goal.award,
    },
  });

  useEffect(() => {
    reset({goalName: goal.name, reason: goal.reason, award: goal.award});
  }, [reset, goal.name, goal.reason, goal.award]);

  useEffect(() => {
    if (startDate) {
      const copyDate = new Date(startDate.getTime());
      setEndDate(new Date(copyDate.setDate(copyDate.getDate() + 90)));
    }
  }, [startDate]);

  useEffect(() => {
    const getCriteria = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      const criteriaData = await successCriteria.getSuccessCriteriaItemByGoalId(
        userData.token,
        goal.id,
      );
      setDataCriteria(criteriaData.data);
      setCriteriaItems(
        criteriaData.data.map(item => {
          return {successCriteria: item.name, value: item.name};
        }),
      );
    };
    getCriteria();
  }, []);

  //   console.log(length);

  const onSubmit = async data => {
    // console.log(data, criteriaItems, items, 111111111);
    const currentUser = JSON.parse(await EncryptedStorage.getItem('user'));
    try {
      console.log(
        currentUser.token,
        data.goalName,
        data.award,
        data.reason,
        startDate,
        endDate,
        value[0],
      );
      const updateGoal = await goals.updateGoal(
        {
          data: {
            name: data.goalName,
            status: `${slider}`,
            goalCategory: {name: value[0]},
            author: currentUser.email,
            award: data.award,
            reason: data.reason,
            startDate,
            endDate,
          },
        },
        currentUser.token,
        goal.id,
      );
      console.log(updateGoal.data);
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    }
  };
  const onSubmitEditing = async () => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    console.log(userData.token, {criteria, goal: goal.id});
    const newSuccessCriteria = await successCriteria.createSuccessCriteriaItem(
      {criteria, goal: goal.id},
      userData.token,
    );
    setCriteriaItems(current => [
      ...current,
      {successCriteria: criteria, value: criteria},
    ]);
    setCriteria('');
  };
  const handleClick = async data => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deletedItem = [...dataCriteria].filter(
      item => item.name === data.value,
    );
    console.log(deletedItem);
    const deleteSuccessCriteria = await successCriteria.deleteSuccessCriteria(
      userData.token,
      deletedItem[0].id,
    );
    setCriteriaItems(current =>
      current.filter(obj => {
        return obj.value !== data.value;
      }),
    );
  };
  const handleDelete = async () => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deleteGoal = await goals.deleteGoal(userData.token, goal.id);
    navigation.navigate('Home');
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
              <TouchableOpacity
                disabled={length === 1 ? true : false}
                style={{marginLeft: 200}}
                onPress={handleDelete}>
                <Icon name="delete" size={20} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Slider
                value={slider}
                step={1}
                onValueChange={setSlider}
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={100}
                //   minimumTrackTintColor="#FFFFFF"
                //   maximumTrackTintColor="#000000"
              />
              <Text>{slider}%</Text>
            </View>
            <SizedBox height={10} />
            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="goalName"
                  rules={{required: true}}
                  render={props => (
                    <TextInput
                      {...props}
                      value={props.field.value}
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
            <SizedBox height={20} />
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
                      value={props.field.value}
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
                  onSubmitEditing={async () => await onSubmitEditing()}
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
                    <TouchableOpacity
                      onPress={async () => await handleClick(item)}>
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
                      value={props.field.value}
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

export default EditGoalItem;
