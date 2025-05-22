import { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Image, Alert, Modal } from "react-native";
import React from "react";
import { reactQuestions } from "../config/question";
import tw from "twrnc";
import * as Progress from 'react-native-progress';

const Questions = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  //Vai para a próxima pergunta com alguams funcionalidades
  const handleNext = () => {
    if (currentQuestionIndex === reactQuestions.length - 1) {
      navigation.navigate("Score", { score: score }); //Se for a ultima pergunta, redireciona para a página de Score
    } else {
      if (!selectedOption) {
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1); //Vai para a próxima pergunta
      setSelectedOption(null); //Reseta a variável salva a opção selecionada
      setIsCorrect(null); //Reseta a função que verifica se está correta
    }
  };

  const handleOptionPress = (pressedOption) => {
    if (selectedOption) {
      return;
    }
    setSelectedOption(pressedOption);
    const isAnwserCorrect = reactQuestions[currentQuestionIndex].correctAnswer === pressedOption;
    setIsCorrect(isAnwserCorrect);

    if (isAnwserCorrect) {
      setScore((prevScore) => prevScore + 20);
    }
  };

  const handleExit = () => {

    setModalVisible(false);
    navigation.navigate("Home");
  };

  return (
    <View style={tw`p-4 flex-1`}>
      <View style={tw`w-full items-center mb-5 justify-center`}>
        <Progress.Bar
          color="rgb(59 130 246)"
          progress={(currentQuestionIndex + 1) / reactQuestions.length}
          width={400}
          height={15}
          borderColor="#ccc"
        />
      </View>

      <Text style={tw`text-2xl mb-4`}>
        {reactQuestions[currentQuestionIndex].title}
      </Text>

      {reactQuestions[currentQuestionIndex].option.map((option, index) => (
        <Pressable
          key={index}
          style={tw`border-2 border-purple-500 p-4 m-2 rounded-md ${
            selectedOption === option
              ? isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
              : "border-blue-500"
          }`}
          onPress={() => {
            handleOptionPress(option);
          }}
        >
          <Text style={tw`text-lg`}>{option}</Text>
        </Pressable>
      ))}

      <Pressable
        style={tw`bg-blue-800 p-4 rounded-md mt-6 ${
          selectedOption ? "opacity-100" : "opacity-60"
        }`}
        onPress={handleNext}
      >
        <Text style={tw`text-white text-lg text-center font-bold`}>
          {currentQuestionIndex === reactQuestions.length - 1
            ? "Finalizar"
            : "Próximo"}
        </Text>
      </Pressable>

      {/* ✅ Botão de Sair */}
      <Pressable
        style={tw`bg-red-500 p-3 rounded-md absolute bottom-5 left-5`}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tw`text-white font-bold`}>Sair</Text>
      </Pressable>

      {/* ✅ Modal de confirmação */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black/50 justify-center items-center`}>
          <View style={tw`bg-white rounded-xl p-6 w-4/5`}>
            <Text style={tw`text-lg font-bold mb-4 text-center`}>
              Deseja realmente sair do quiz?
            </Text>

            <View style={tw`flex-row justify-around`}>
              <Pressable
                style={tw`bg-red-500 px-5 py-2 rounded-md`}
                onPress={handleExit}
              >
                <Text style={tw`text-white font-bold`}>Sim</Text>
              </Pressable>

              <Pressable
                style={tw`bg-gray-300 px-5 py-2 rounded-md`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-black font-bold`}>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Image
        source={require("../img/LOGO_AZUL.png")}
        style={tw`w-30 h-12 absolute bottom-5 right-5`}
      />
    </View>
  );
};

export default Questions;
