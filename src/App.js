import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

/**
 * TextInput: testID="input" (component which is user types the todo text)
 * TouchableOpacity: testID="button" (component which is saves the todo to list)
 * FlatList: testID="list" (list of todo)
 */

//component
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.item, style]}>{item.title}</Text>
  </TouchableOpacity>
);

function App() {
  const [toDoList, handletoDoList] = useState([]); //todo State
  const [toDoText, storeItem] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [itemClicked, handleClicked] = useState(null);

  const renderItem = ({ item }) => {
    console.log(toDoList + " // todolist item")
    console.log(toDoText + " // todo textboxtan gelen text")
    const backgroundColor = item.id === selectedId && itemClicked ? '#c6c6c6' : '#301b5e';
    const textDecorationLine = item.id === selectedId && itemClicked ? 'line-through' : 'none';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          isDone(item.id)
        }}
        style={[
          styles.listItem,
          { backgroundColor },
          { textDecorationLine }
        ]}
      />
    );
  };

  const isDone = (id) => itemClicked ? handleClicked(false) : handleClicked(true);
  const addToDoList = () => {
    if (!toDoText === "") {
      handletoDoList(toDoList => [...toDoList,
      {
        id: Math.floor(Math.random() * 100),
        title: toDoText,
        isDone: false,
      }]
      )
    }

    storeItem('')
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text styles={styles.headerName}>toDo</Text>
        <Text styles={styles.headerNumber}>{toDoList.filter(todo => todo.isDone === true).length}</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={toDoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}>
        </FlatList>
      </View>
      <View style={styles.bottom}>
        <TextInput
          style={styles.textInput}
          placeholder="Type something to do..."
          onChangeText={(text) => storeItem(text)}
          value={toDoText}
        />
        <Button color='#301b5e' title="ADD TODO" onPress={addToDoList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  list: {
    flex: 4,
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.6,
  },
  textInput: {
    backgroundColor: '#c6c6c6',
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#301b5e',
    borderRadius: 3,
  },
  listItem: {
    width: Dimensions.get('window').width * 0.97,
    height: Dimensions.get('window').width * 0.1,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    marginBottom: 5,
  }

});
export default App;
