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
import actionItems from '../../api/actionItems';

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

// const weeks = [
//   'Week 1',
//   'Week 2',
//   'Week 3',
//   'Week 4',
//   'Week 5',
//   'Week 6',
//   'Week 7',
//   'Week 8',
//   'Week 9',
//   'Week 10',
//   'Week 11',
//   'Week 12',
// ];

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const EditActionItem = ({navigation, route}) => {
  const {actionItem} = route.params;
  const [openStatus, setOpenStatus] = useState(false);
  const [statusValue, setStatusValue] = useState([actionItem.status]);
  const [statuses, setStatuses] = useState([
    {
      label: 'In progress',
      value: 'inProgress',
    },
    {
      label: 'To do',
      value: 'toDo',
    },
    {
      label: 'Complete',
      value: 'complete',
    },
  ]);
  const [openWeeks, setOpenWeeks] = useState(false);
  const [open, setOpen] = useState(false);
  const [goalsValue, setGoalsValue] = useState([actionItem.goal.id]);
  const [weekValue, setWeekValue] = useState([actionItem.week]);
  const [weeks, setWeeks] = useState([
    {
      label: 'Week 1',
      value: 'Week 1',
    },
    {
      label: 'Week 2',
      value: 'Week 2',
    },
    {
      label: 'Week 3',
      value: 'Week 3',
    },
    {
      label: 'Week 4',
      value: 'Week 4',
    },
    {
      label: 'Week 5',
      value: 'Week 5',
    },
    {
      label: 'Week 6',
      value: 'Week 6',
    },
    {
      label: 'Week 7',
      value: 'Week 7',
    },
    {
      label: 'Week 8',
      value: 'Week 8',
    },
    {
      label: 'Week 9',
      value: 'Week 9',
    },
    {
      label: 'Week 10',
      value: 'Week 10',
    },
    {
      label: 'Week 11',
      value: 'Week 11',
    },
    {
      label: 'Week 12',
      value: 'Week 12',
    },
  ]);
  const [goalsData, setGoalsData] = useState([]);
  const [goalsSelect, setGoalsSelect] = useState([]);

  const dispatch = useDispatch();

  console.log(goalsValue[0]);

  const {control, handleSubmit, formState, getValues, reset} = useForm({
    defaultValues: {
      actionItem: actionItem.name,
    },
  });
  useEffect(() => {
    const getGoals = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      const allGoals = await goals.getGoals(userData.token, userData.id);
      setGoalsData(allGoals.data.rows);
    };
    getGoals();
  }, []);

  useEffect(() => {
    if (goalsData) {
      const goalsSelectData = goalsData.map(item => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setGoalsSelect(goalsSelectData);
    }
  }, [goalsData]);

  useEffect(() => {
    reset({actionItem: actionItem.name});
  }, [reset, actionItem.name]);

  const onSubmit = async data => {
    const currentUser = JSON.parse(await EncryptedStorage.getItem('user'));
    try {
      const editActionItem = await actionItems.updateActionItem(
        currentUser.token,
        {
          goal: goalsValue[0],
          name: data.actionItem,
          week: weekValue[0],
          status: statusValue[0],
        },
        actionItem.id,
      );
      console.log(editActionItem);
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    }
  };

  const handleDelete = async () => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deleteActionItem = await actionItems.deleteActionItem(
      userData.token,
      actionItem.id,
    );
    navigation.navigate('Home');
  };

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
                style={{marginLeft: 200}}
                onPress={handleDelete}>
                <Icon name="delete" size={20} />
              </TouchableOpacity>
            </View>
            <SizedBox height={20} />
            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="actionItem"
                  rules={{required: true}}
                  render={props => (
                    <TextInput
                      {...props}
                      value={props.field.value}
                      label="Action Item"
                      placeholder="Type Item Name"
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

            <DropDownPicker
              open={open}
              value={goalsValue}
              items={goalsSelect}
              setOpen={setOpen}
              setValue={setGoalsValue}
              setItems={setGoalsSelect}
              multiple={true}
              mode="BADGE"
              max={1}
            />

            <SizedBox height={80} />
            <DropDownPicker
              open={openWeeks}
              value={weekValue}
              items={weeks}
              setOpen={setOpenWeeks}
              setValue={setWeekValue}
              setItems={setWeeks}
              multiple={true}
              mode="BADGE"
              max={1}
            />
            <SizedBox height={80} />
            <DropDownPicker
              open={openStatus}
              value={statusValue}
              items={statuses}
              setOpen={setOpenStatus}
              setValue={setStatusValue}
              setItems={setStatuses}
              multiple={true}
              mode="BADGE"
              max={1}
            />
            <SizedBox height={40} />
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Create</Text>
              </View>
            </TouchableOpacity>
            <SizedBox height={40} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditActionItem;
