import { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import validate from "react-native-email-validator";
import tw from "twrnc";
import LottieView from 'lottie-react-native';
import { store, TABLE_NAME, initializeStore } from "../config/store.js"; // ✅ import externo
import MaskInput from 'react-native-mask-input'

export default function Form({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Inicializando store...");
        await initializeStore();  // Certifique-se de que a inicialização do store está correta
        console.log("Store pronto!");
        setLoaded(true);  // Atualize o estado para refletir que o banco foi carregado
      } catch (e) {
        console.error("Erro ao inicializar banco:", e);
        Alert.alert("Erro", "Não foi possível carregar o banco de dados.");
      }
    };
console.log(store.getTable(TABLE_NAME))
    loadData();
  }, []);

  function onSubmit() {
    if (!loaded) {
      Alert.alert("Aguarde", "O banco de dados ainda está carregando...");
      return;
    }

    if (!(name && email)) {
      Alert.alert("Erro", "Preencha todos os dados");
      return;
    }

    if (!validate(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }

    const id = Math.random().toString(30).substring(2, 20);  // Gerar ID único
    try {
      // Tente adicionar a linha ao store e verificar se houve erro
      store.setRow(TABLE_NAME, email, { name, email });
      console.log("Usuário adicionado ao banco com sucesso");
      

      // Limpeza do formulário
      setName("");
      setEmail("");

      // Navega para a próxima tela
      navigation.navigate("Question");
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  }

  return (
    <View style={tw`flex-1 justify-center px-4 mb-20`}>
      <View style={tw`items-center mt-4`}>
        <LottieView
          source={require('../animations/Form.json')}
          autoPlay
          loop
          style={tw`w-1/2 h-40`}
        />
      </View>
      <Text style={tw`text-3xl font-bold text-center`}>Cadastro</Text>

      <View style={tw`w-full mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nome</Text>
        <TextInput
          style={tw`p-4 border-2 border-purple-500 w-full rounded-md`}
          placeholder="Fulano de tal"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={tw`w-full mb-4`}>
        <Text style={tw`text-lg font-bold`}>Email</Text>
        <TextInput
          style={tw`p-4 border-2 border-purple-500 w-full rounded-md`}
          placeholder="Fulano@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Pressable
        style={[
          tw`p-4 rounded-md mt-6 w-full justify-center items-center`,
          loaded ? tw`bg-purple-500` : tw`bg-gray-400`
        ]}
        onPress={onSubmit}
        disabled={!loaded}
      >
        <Text style={tw`text-white font-bold`}>
          {loaded ? "Começar" : "Carregando..."}
        </Text>
      </Pressable>
    </View>
  );
}
