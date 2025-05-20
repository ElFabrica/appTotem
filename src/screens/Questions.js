import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { reactQuestions } from "../config/question";
import tw from "twrnc";
import {AsyncStorage} from 'react-native';

const Questions = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  const handleNext = () =>{
    if(currentQuestionIndex === reactQuestions.length-1){
        navigation.navigate("Score", { score:score })
    }else{
      if(!selectedOption){
        return
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsCorrect(null)
    }
    
  }

    //Pressioanr opção
  console.log({isCorrect})

  const handleOptionPress =(pressedOption)=>{

    if(selectedOption){
      return
    }
    setSelectedOption(pressedOption)
    const isAnwserCorrect = reactQuestions[currentQuestionIndex].correctAnswer === pressedOption
  
    setIsCorrect(isAnwserCorrect)

      if(isAnwserCorrect){
        setScore((prevScore)=>prevScore+10)
      }
}
  return (
    <View style ={tw`mt-6 p-4 flex-1 `}>
      <Text style ={tw`text-2xl mb-4`}>{reactQuestions[currentQuestionIndex].title}</Text>
      {reactQuestions[currentQuestionIndex].option.map((option, index) => (
        
        <Pressable key={index} style ={tw`border-2 border-purple-500 p-4 m-2 rounded-md ${
          selectedOption === option ? isCorrect ?
           "bg-green-100 border-green-500" 
           : "bg-red-100 border-red-500" 
           : "border-purple-500"
        }`} onPress={()=>{handleOptionPress(option)}}>
          <Text style={tw`text-lg`}>{option}</Text>
        </Pressable>

      ))}

      <Pressable style={tw`bg-purple-500 p-4 rounded-md mt-6 ${selectedOption? "opacity-100" :"opacity-60"}`} onPress={handleNext}>
        <Text style={tw`text-white text-lg text-center font-bold`}>{currentQuestionIndex === reactQuestions.length-1 ? "Finalizar":"Próximo"}</Text>
      </Pressable>
       <Image
    source={require('../img/LOGO_AZUL.png')}
    style={tw`w-30 h-12 absolute bottom-5 right-5`}
  />
    </View>

  )


}

export default Questions

const styles = StyleSheet.create({

})