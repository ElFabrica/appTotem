import { View, Text, StyleSheet, Pressable,Image } from "react-native";
import React from "react";
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

const Splash = ({ navigation }) => {
  return (

    <View style={tw`flex-1`}>
  <Image
    source={require('../img/LOGO_AZUL.png')}
    style={tw`w-30 h-12 absolute top-5 right-5`}
  />
  
  {/* Resto do conteúdo centralizado */}
  <View style={tw`justify-center items-center`}>
    {/* ... */}
  </View>


    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-purple-600 font-medium text-5xl mb-5 leading-10 `}>Bem-vindo ao {"\n"} Quesitonário
      </Text>

      {<LottieView source={require('../animations/Estudant.json')} autoPlay loop style={tw`w-5/6 h-1/3`} />}
      <Text style={tw`text-4xl text-center mb-5`}>Instruções</Text>
      <View style={tw`bg-purple-500 p-4 rounded-lg w-80 items-center justify-center `}>
        <Text style={tw`text-white text-lg`}>Cada Pergunta do quiz há somente 4 alternativas.</Text>
        <Text style={tw`text-white text-lg`}>O seu preogresso será mostrado no topo.</Text>
        <Text style={tw`text-white text-lg`}>Você verá a sua pontuação no final do Quiz.</Text>
      </View>
      <Pressable style={tw`bg-purple-500 mt-10 p-6 py-1 rounded`} onPress={() => navigation.navigate("Question")}>
        <Text style={tw`text-white text-lg`}>Iniciar</Text>
      </Pressable>
    </View>
</View>
  )
}



export default Splash

const styles = StyleSheet.create({

})