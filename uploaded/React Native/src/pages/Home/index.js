import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import goals from '../../api/goals';
import actionItems from '../../api/actionItems';
import EncryptedStorage from 'react-native-encrypted-storage';
import {List} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PercentageCircle from 'react-native-percentage-circle';

const Home = ({navigation}) => {
  const [goalsData, setGoalsData] = useState([]);
  const [actionItemsData, setActionItemsData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [index, setIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const userData = JSON.parse(await EncryptedStorage.getItem('user'));
        const allGoals = await goals.getGoals(userData.token, userData.id);
        const allActionItems = await Promise.all(
          allGoals.data.rows.map(async item => {
            const actionItem = await actionItems.getActionItems(
              userData.token,
              item.id,
            );
            return actionItem.data.rows;
          }),
        );
        setGoalsData(allGoals.data.rows);
        setActionItemsData(allActionItems[0]);
      };
      getData();
    }, []),
  );

  const handlePress = () => setExpanded(!expanded);

  console.log(goalsData);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {/* <List.Section style={{flexDirection: 'row'}}>
        <List.Accordion
          title="Action Items"
          style={{width: 180}}
          // left={props => <List.Icon {...props} icon="folder" />}
          // expanded={expanded}
          // onPress={handlePress}
        >
          {actionItemsData !== undefined &&
            actionItemsData.map(item => (
              <List.Item
                key={item.id}
                title={item.name}
                onPress={() =>
                  navigation.navigate('EditActionItem', {actionItem: item})
                }
              />
            ))}
        </List.Accordion>
        <List.Accordion
          title="12 Week Goals"
          style={{width: 180}}
          // left={props => <List.Icon {...props} icon="folder" />}
        >
          {goalsData !== undefined &&
            goalsData.map(item => (
              <List.Item
                key={item.id}
                title={item.name}
                onPress={() =>
                  navigation.navigate('EditGoalItem', {
                    goal: item,
                    length: goalsData.length,
                  })
                }
              />
            ))}
        </List.Accordion>
      </List.Section> */}
      <View style={{flex: 1, backgroundColor: '#79DBF2'}} />
      <View style={{flex: 2, backgroundColor: '#F5F5F5'}} />
      {goalsData !== undefined && goalsData.length !== 0 ? (
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width * 0.85,
            height: Dimensions.get('screen').height * 0.3,
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 16,
            top: 70,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
          <FlatList
            horizontal
            data={goalsData}
            renderItem={({item}) => (
              <View
                style={{
                  // alignSelf: 'center',
                  width: Dimensions.get('screen').width * 0.78,
                  height: Dimensions.get('screen').height * 0.22,
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={goalsData.length === 1 ? true : false}
                      style={{alignSelf: 'center'}}>
                      <Icon
                        name="navigate-before"
                        size={23}
                        color={goalsData.length === 1 ? 'lightgrey' : 'black'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          lineHeight: 26,
                          fontSize: 20,
                          fontWeight: '400',
                          color: '#1D2E54',
                        }}>
                        {item.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditGoalItem', {
                            goal: item,
                            length: goalsData.length,
                          })
                        }>
                        <Text
                          style={{
                            textAlign: 'center',
                            lineHeight: 20,
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#797776',
                          }}>
                          Tap to update progress
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      <View
                        style={{
                          height: Dimensions.get('screen').height * 0.15,
                          width: Dimensions.get('screen').width * 0.55,
                          alignItems: 'center',
                          // backgroundColor: 'red',
                        }}>
                        <PercentageCircle
                          radius={Dimensions.get('screen').height * 0.07}
                          percent={Number(item.status)}
                          borderWidth={4}
                          color="#859DD6"
                          bgcolor="#E1E7F5">
                          <Icon name="emoji-events" size={50} color="#E1E7F5" />
                          <Text style={{fontSize: 10}}>{item.status}%</Text>
                        </PercentageCircle>
                      </View>
                    </View>
                    <View style={{alignSelf: 'center', marginTop: 5}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          lineHeight: 16,
                          fontSize: 11,
                          fontWeight: '510',
                          color: '#797776',
                        }}>
                        Weekly Action Items Completed
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          lineHeight: 16,
                          fontSize: 11,
                          fontWeight: '510',
                          color: '#797776',
                          marginTop: 5,
                        }}>
                        11/21/1212
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={goalsData.length === 1 ? true : false}
                      style={{alignSelf: 'center'}}>
                      <Icon
                        name="navigate-next"
                        size={23}
                        color={goalsData.length === 1 ? 'lightgrey' : 'black'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width * 0.85,
            height: Dimensions.get('screen').height * 0.3,
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 16,
            top: 70,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    // marginTop: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      lineHeight: 26,
                      fontSize: 20,
                      fontWeight: '400',
                      color: '#1D2E54',
                    }}>
                    No Goals Yet
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      height: Dimensions.get('screen').height * 0.15,
                      width: Dimensions.get('screen').width * 0.55,
                      alignItems: 'center',
                    }}>
                    <PercentageCircle
                      radius={Dimensions.get('screen').height * 0.07}
                      percent={0}
                      borderWidth={4}
                      color="#859DD6"
                      bgcolor="#E1E7F5">
                      <Icon name="emoji-events" size={50} color="#E1E7F5" />
                    </PercentageCircle>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
