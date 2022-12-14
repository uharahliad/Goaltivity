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
  Button,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setModalOpen} from '../../redux/reducers/modalSlice';
import {store} from '../../redux/store/store';
import goals from '../../api/goals';
import EncryptedStorage from 'react-native-encrypted-storage';

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

const AddModal = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getGoals = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      const goalsData = await goals.getGoals(userData.token, userData.id);
      setData(goalsData.data.rows);
    };
    getGoals();
  }, []);

  //   console.log(data);
  return (
    <View style={{height: 300, backgroundColor: 'transparent'}}>
      <Button
        title="Add 12 week goal"
        onPress={() => navigation.navigate('AddGoalItem')}
      />
      {data && data.length > 0 ? (
        <Button
          title="Add action item"
          onPress={() => navigation.navigate('AddActionItem')}
        />
      ) : null}
    </View>
  );
};

export default AddModal;
