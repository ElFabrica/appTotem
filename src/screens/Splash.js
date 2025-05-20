import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import tw from 'twrnc';

const Splash = ({ navigation }) => {
  return(

<View style={tw`flex-1 justify-center items-center`}>
  <Text>Splash</Text>
    
    
      <Text style ={tw`text-purple-600 font-medium text-2xl mb-10 `}>Ir para o questionario</Text>


    <Text style={tw`text-2xl text-center`}>Instruções</Text>

    <View style={tw`bg-purple-500 p-2 rounded h-30 w-80 items-center justify-center`}>
      <Text style ={tw`text-white text-lg`}>Cada Pergunta do quiz há somente 4 alternativas</Text>
      <Text style ={tw`text-white text-lg`}>O seu preogresso será mostrado no topo</Text>
      <Text style ={tw`text-white text-lg`}>Você verá a sua pontuação no final do Quiz</Text>
    </View>
    <Pressable style={tw`bg-purple-500 mt-10 p-6 py-1 rounded`} onPress={()=>navigation.navigate("Question")}>
      <Text style={tw`text-white text-lg`}>Iniciar</Text>
    </Pressable>
</View>

  )
}
  
  

  export default Splash   

  const styles = StyleSheet.create({

  })