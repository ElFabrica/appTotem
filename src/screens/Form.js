import { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import validate from "react-native-email-validator";
import tw from "twrnc";

// Tinybase
import { createStore } from "tinybase";
import { useCreatePersister } from "tinybase/ui-react"
import * as SQLite from "expo-sqlite"
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite"

const TABLE_NAME = "users";
const store = createStore();

export default function Form({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  useCreatePersister(
    store,
    (store) => createExpoSqlitePersister(store, SQLite.openDatabaseAsync("database.db")),
    [],
    (persister) => persister.load().then(persister.startAutoSave)
  )

  function onSubmit() {
    const isValid = validate(email);
    if (!(name && email)) {
      alert("Preencha todos os dados");
      return;
    }
    if (!isValid) {
      alert("E-mail inválido");
      return;
    }

    // ID: {} -> Ex.: 123: {  }
    const id = Math.random().toString(30).substring(2, 20)
    store.setRow(TABLE_NAME, id, { name, email })
    navigation.navigate("Question")

    setName("")
    setEmail("")
    // get()
  }


  return (
    <View style={tw`flex-1 justify-center items-center px-4`}>
      <Text style={tw`text-2xl font-bold`}>Cadastro</Text>
      <View style={tw`w-full gap-4 mt-4`}>
        <TextInput
          style={tw`p-4 border-2 border-purple-500 w-full rounded-md`}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={tw`p-4 border-2 border-purple-500 w-full rounded-md`}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Pressable
        style={tw`bg-purple-500 p-4 rounded-md mt-6 w-full justify-center items-center`}
        onPress={onSubmit}
      >
        <Text style={tw`text-white font-bold`}>Começar</Text>
      </Pressable>
    </View>
  );
}
