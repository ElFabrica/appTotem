import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { reactQuestions } from "../config/question";
import tw from "twrnc";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const handleNext = () =>{
    if(currentQuestionIndex === reactQuestions.length-1){
      return
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  return (
    <View style ={tw`mt-6 p-4`}>
      <Text style ={tw`text-2xl mb-4`}>{reactQuestions[currentQuestionIndex].title}</Text>
      {reactQuestions[currentQuestionIndex].option.map((option) => (
        <View style ={tw`border-2 border-purple-500 p-4 m-2 rounded-md`}>
          <Text style={tw`text-lg`}>{option}</Text>
        </View>
      ))}

      <Pressable style={tw`bg-purple-500 p-4 rounded-md mt-6`} onPress={handleNext}>
        <Text style={tw`text-white text-lg text-center font-bold`}>Próximo</Text>
      </Pressable>
    </View>

  )


}

export default Questions

const styles = StyleSheet.create({

})