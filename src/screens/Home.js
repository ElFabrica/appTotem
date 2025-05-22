import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const Splash = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chave, setChave] = useState('');


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
        <Text style={tw`text-purple-600 font-medium text-5xl mb-5 leading-10`}>
          Bem-vindo ao{"\n"} Questionário
        </Text>
        
        <LottieView
          source={require('../animations/Estudant.json')}
          autoPlay
          loop
          style={tw`w-5/6 h-1/3`}
        />
        <Text style={tw`text-4xl text-center mb-5`}>Instruções</Text>

        <View style={tw`bg-purple-500 p-4 rounded-lg w-80 items-center justify-center`}>
          <Text style={tw`text-white text-lg`}>Cada pergunta do quiz há somente 4 alternativas.</Text>
          <Text style={tw`text-white text-lg`}>O seu progresso será mostrado no topo.</Text>
          <Text style={tw`text-white text-lg`}>Você verá a sua pontuação no final do quiz.</Text>
        </View>

        <View style={tw`flex-row gap-4`}>
          <Pressable
            style={tw`bg-purple-500 mt-10 p-6 py-1 rounded`}
            onPress={() => navigation.navigate("Form")}>
            <Text style={tw`text-white text-lg`}>Iniciar</Text>
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
                style={tw`bg-purple-500 px-5 py-2 rounded-md`}
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
