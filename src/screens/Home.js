import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const Splash = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chave, setChave] = useState('');

//Função de verificar senha e ir para o acesso restrito
function acessoRestrito() {
  if (chave !== "Fala1234@") {
    Alert.alert("Código inválido")
    setChave("")
    return
  } 
  setModalVisible(false)
  navigation.navigate("Users")
  setChave("")
}

  return (
    <View style={tw`flex-1`}>
      {/* Logo */}
      <Image
        source={require('../img/LOGO_AZUL.png')}
        style={tw`w-30 h-12 absolute top-5 right-5`}
      />

      {/* Ícone */}
      <Pressable onPress={() => setModalVisible(true)}>
        <Icon name="gear" size={24} color="purple" style={tw`mt-4 mx-2`} />
      </Pressable>

      {/* Conteúdo principal */}
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-blue-500  font-medium text-5xl mb-5 leading-10`}>
          Bem-vindo ao{"\n"} Questionário
        </Text>
        {/* Animação */}
        <LottieView
          source={require('../animations/Estudant.json')}
          autoPlay
          loop
          style={tw`w-5/6 h-1/3`}
        />
        <Text style={tw`text-blue-500  font-bold text-3xl text-center mb-5`}>Instruções</Text>

        {/* Instruções */}
        <View style={tw`bg-blue-800 p-4 rounded-lg w-95 items-center justify-center `}>
          <Text style={tw`text-white text-lg text-center text-center`}>Cada pergunta do quiz tem apenas três alternativas e uma correta.</Text>
          <Text style={tw`text-white  text-lg text-center`}>Seu progresso será exibido no topo.</Text>
          <Text style={tw`text-white text-lg text-center`}>Você verá a sua pontuação no final do quiz.</Text>
        </View>

        <View style={tw`flex-row gap-4`}>
          {/* Botão de iniciar */}
          <Pressable
            style={tw`bg-blue-800 mt-10 p-6 py-1 rounded py-3`}
            onPress={() => navigation.navigate("Formulário")}>
            <Text style={tw`text-white font-bold text-3xl`}>Iniciar</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal / Popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white w-80 p-5 rounded-lg shadow-lg`}>
            <Text style={tw`text-xl font-semibold mb-4 text-center`}>Acesso Restrito</Text>
            
            <TextInput
              placeholder="Digite a chave"
              placeholderTextColor="#888"
              style={tw`border border-purple-500 rounded-md p-3 mb-4 text-base`}
              value={chave}
              onChangeText={setChave}
            />

            <View style={tw`flex-row justify-between`}>   
              <Pressable
                style={tw`bg-gray-400 px-5 py-2 rounded-md`}
                onPress={() => [setModalVisible(false), setChave("")]}
              >
                <Text style={tw`text-white text-base`}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={tw`bg-blue-500 px-5 py-2 rounded-md`}
                onPress={() => {
                  acessoRestrito()
                }}
              >
                <Text style={tw`text-white text-base`}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
