import { View, Text, Pressable,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useRoute } from "@react-navigation/native"
import LottieView from 'lottie-react-native';

export default function Score({navigation}) {
  const route = useRoute()
  const {score} = route.params

  function voltar(){
    navigation.navigate("Home")
  }
  return (
    <View style={tw`flex-1 items-center justify-center px-4`}>
       <Image
    source={require('../img/LOGO_AZUL.png')}
    style={tw`w-30 h-12 absolute top-5 right-5`}
  />
      {<LottieView source={require('../animations/Finish2.json')} autoPlay loop style={tw`w-1/2 h-1/4`} />}
      <Text style={tw`text-purple-600 font-medium text-5xl mb-3 leading-10 text-center`}>Parabens!!!</Text>
        <Text style={tw`text-purple-600 font-medium text-3xl mb-5 leading-10 text-center`}>Você concluiu seu formulário
        Sua pontuação foi {score} pontos</Text>

              <Pressable style={tw`bg-purple-500 p-4 rounded-md mt-6 `}>
        <Text style={tw`text-white text-lg text-center font-bold text-2xl`} onPress={voltar}>Voltar</Text>
      </Pressable>
    </View>
  )
}
