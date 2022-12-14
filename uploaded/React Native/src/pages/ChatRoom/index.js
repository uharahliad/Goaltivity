import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Alert, View, StyleSheet, ActivityIndicator} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {TwilioService} from '../../api/twilioService';
import auth from '../../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Client} from 'twilio-chat';
import {useDispatch} from 'react-redux';

function ChatRoom({route}) {
  const {name, identity} = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();

  console.log(messages, name, '////');

  const setChannelEvents = useCallback(channel => {
    chatClientChannel.current = channel;
    chatClientChannel.current.on('messageAdded', message => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      const {giftedId} = message.attributes;
      if (giftedId) {
        setMessages(prevMessages => {
          if (prevMessages.some(({_id}) => _id === giftedId)) {
            return prevMessages.map(m => (m._id === giftedId ? newMessage : m));
          }
          return [newMessage, ...prevMessages];
        });
      }
    });
    return chatClientChannel.current;
  }, []);

  useEffect(() => {
    auth
      .getTwilioToken(identity)
      .then(({data}) => TwilioService.getInstance().getChatClient(data.jwt))
      .then(client => client.getChannelByUniqueName(name))
      .then(channel => setChannelEvents(channel))
      .then(currentChannel => currentChannel.getMessages())
      .then(paginator => {
        chatMessagesPaginator.current = paginator;
        const newMessages = TwilioService.getInstance().parseMessages(
          paginator.items,
        );
        setMessages(newMessages);
      })
      .catch(err => console.log({message: err.message, type: 'danger'}))
      .finally(() => setLoading(false));
  }, [name, identity, setChannelEvents]);

  const onSend = useCallback((newMessages = []) => {
    const attributes = {giftedId: newMessages[0]._id};
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    chatClientChannel.current?.sendMessage(newMessages[0].text, attributes);
  }, []);

  return (
    <View style={styles.screen}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <GiftedChat
          messagesContainerStyle={styles.messageContainer}
          messages={messages}
          renderAvatarOnTop
          onSend={messages => onSend(messages)}
          user={{_id: identity}}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  messageContainer: {
    backgroundColor: 'lightgrey',
  },
});

export default ChatRoom;
