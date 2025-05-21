import { View, Text, ScrollView } from 'react-native'
import { createStore } from "tinybase";
import { useEffect, useState } from 'react';
import tw from 'twrnc';

// Tinybase
const TABLE_NAME = "users";
const store = createStore();

export default function Users() {
  const [users, setUsers] = useState([])

  function get() {
    const data = store.getTable(TABLE_NAME);
    
    const response = Object.entries(data).map(([id, users]) => ({
      id,
      name: String(users.name),
      email: String(users.email)
    }))

    setUsers(response)
    console.log(data)
  }

  useEffect(() => {
    const listener = store.addTableListener(listener)
    get()

    return () => store.delListener(listener)
  }, [])

  return (
    <View style={tw`flex-1 items-center mt-8 px-4`}>
      <Text>Inscritos</Text>
      <View style={tw`mt-6 w-full`}>
        {users.length > 0 ? users.map((item, index) => (
        <View key={index}>
          {item.email}
        </View>
      )) : <Text>Nenhum dado encontrado...</Text>} 
      </View>
    </View>
  )
}