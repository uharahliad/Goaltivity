import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import accountabilityGroups from '../../api/accountabilityGroups';
import auth from '../../api/auth';
import {TwilioService} from '../../api/twilioService';
import {useDispatch} from 'react-redux';
import {setNewChannels} from '../../redux/reducers/channelSlice';
import {Client} from '@twilio/conversations';

const Chat = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState('');
  const [chatToken, setChatToken] = useState('');
  const [channels, setChannels] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccountabilityGroups = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      setUser(userData.email);
      return await accountabilityGroups.getAccountabilityGroups(userData.token);
    };
    getAccountabilityGroups().then(allGroups => {
      console.log(allGroups.data.rows[0].users);
      if (allGroups.data.rows.length) {
        setGroups(allGroups.data.rows);
      } else {
        Alert.alert('You have no groups');
      }
    });
  }, []);

  const onAddChannel = channel => {
    const newChannel = TwilioService.getInstance().parseChannel(channel);
    dispatch(setNewChannels(newChannel));
  };

  console.log(channels);

  const onCreateOrJoin = async item => {
    setLoading(true);
    auth
      .getTwilioToken(user)
      .then(({data}) => new Client(data.jwt))
      .then(async client => {
        const a = await client.getSubscribedConversations(item.name);
        const b = await a.items[0].getMessages();
        console.log(b, '////////////');
      })
      // .then(client =>
      //   client
      //     .getChannelByUniqueName(item.name)
      //     .then(channel =>
      //       channel.channelState.status !== 'joined' ? channel.join() : channel,
      //     )
      //     .then(onAddChannel)
      //     .catch(() =>
      //       client
      //         .createChannel({
      //           uniqueName: item.name,
      //           friendlyName: item.name,
      //         })
      //         .then(channel => {
      //           setChannels(channel);
      //           onAddChannel(channel);
      //           channel.join();
      //         }),
      //     ),
      // )
      .then(() => console.log({message: 'You have joined.'}))
      .catch(err => console.log({message: err.message, type: 'danger'}))
      .finally(() => setLoading(false));
  };

  return (
    <View>
      <FlatList
        data={groups}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatRoom', {
                name: item.name,
                identity: user,
              })
            }>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Chat;
