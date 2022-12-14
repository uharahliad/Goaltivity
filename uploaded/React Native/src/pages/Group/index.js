import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Button} from 'react-native-paper';
import accountabilityGroups from '../../api/accountabilityGroups';

const Group = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getAccountabilityGroups = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      return await accountabilityGroups.getAccountabilityGroups(userData.token);
    };
    const addUserAccountabilityGroup = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      return await accountabilityGroups.addUserAccountabilityGroup(
        userData.token,
      );
    };
    getAccountabilityGroups().then(allGroups => {
      console.log(allGroups.data.rows[0].users, '/////');
      if (allGroups.data.length) {
        setGroups(allGroups.data);
      } else {
        addUserAccountabilityGroup().then(group =>
          setGroups(prev => [...prev, group.data]),
        );
      }
    });
  }, []);

  // const onPress = async () => {
  //   const userData = JSON.parse(await EncryptedStorage.getItem('user'));
  //   await accountabilityGroups.createAccountabilityGroup(
  //     {data: {name: 'AllUsersGroup'}},
  //     userData.token,
  //   );
  // };

  console.log(groups);

  return (
    <View>
      <FlatList
        data={groups}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      {/* <Button onPress={onPress}>click</Button> */}
    </View>
  );
};

export default Group;
