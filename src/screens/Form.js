import { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Alert,ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, 
Keyboard } from "react-native";
import validator from 'email-validator';
import tw from "twrnc";
import LottieView from 'lottie-react-native';
import { store, TABLE_NAME, initializeStore } from "../config/store.js"; // ✅ import externo
import MaskInput from 'react-native-mask-input'


export default function Form({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loaded, setLoaded] = useState(false);

  //Ao carregar a página, ele inicializa o storge
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Inicializando store...");
        await initializeStore();  // Certifique-se de que a inicialização do store está correta
        console.log("Store pronto!");
        setLoaded(true);  // Atualize o estado para refletir que o banco foi carregado
      } catch (e) {
        //Se der merda em alguma coisa, vai avisae eu e o usuário
        console.error("Erro ao inicializar banco:", e);
        Alert.alert("Erro", "Não foi possível carregar o banco de dados.");
      }
    };
    loadData();
  }, []);

  //Função que salva o formulário no storge do smartphone
  function onSubmit() {
    if (!loaded) { //Verifica se o banco inicializou corretamente
      Alert.alert("Aguarde", "O banco de dados ainda está carregando...");
      return;
    }
      //Valida de algum dos dados estão vazios
    if (!(name && email && phone)) {
      Alert.alert("Erro", "Preencha todos os dados");
      return;
    }
      //Valida se o email é um email válido (Não verifica se o email existe)
    if (!validator.validate(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }
    //Caso funcione tudo redondo
    const id = Math.random().toString(30).substring(2, 20);  // Gerar ID único
    try {
      // adicionar a linha ao store
      store.setRow(TABLE_NAME, id, { name, email, phone });
      console.log("Usuário adicionado ao banco com sucesso");
      

      // Limpeza do formulário
      setName("");
      setEmail("");
      setPhone("")

      // Navega para a próxima tela
      navigation.navigate("Question");
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  }

  return (
   <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={tw`flex-1`}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView
      contentContainerStyle={tw`flex-grow px-4 mb-20`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`items-center mt-4`}>
        <LottieView
          source={require('../animations/Form.json')}
          autoPlay
          loop
          style={tw`w-1/2 h-40`}
        />
      </View>

      <Text style={tw`text-blue-500 font-medium text-4xl font-bold text-center`}>
        Cadastro
      </Text>

      {/* NOME */}
      <View style={tw`w-full mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nome</Text>
        <TextInput
          style={tw`p-4 border-2 border-blue-500 w-full rounded-md`}
          placeholder="John"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* EMAIL */}
      <View style={tw`w-full mb-4`}>
        <Text style={tw`text-lg font-bold`}>Email</Text>
        <TextInput
          style={tw`p-4 border-2 border-blue-500 w-full rounded-md`}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* TELEFONE */}
      <View style={tw`w-full mb-4`}>
        <Text style={tw`text-lg font-bold`}>Telefone</Text>
        <MaskInput
          value={phone}
          onChangeText={setPhone}
          mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          keyboardType="numeric"
          placeholder="(00) 00000-0000"
          style={tw`p-4 border-2 border-blue-500 w-full rounded-md`}
        />
      </View>

      {/* BOTÃO */}
      <Pressable
        style={[
          tw`p-4 rounded-md mt-6 w-full justify-center items-center`,
          loaded ? tw`bg-blue-800` : tw`bg-gray-400`
        ]}
        onPress={onSubmit}
        disabled={!loaded}
      >
        <Text style={tw`text-white font-bold`}>
          {loaded ? "Começar" : "Carregando..."}
        </Text>
      </Pressable>
    </ScrollView>
  </TouchableWithoutFeedback>
</KeyboardAvoidingView>

  );
}
