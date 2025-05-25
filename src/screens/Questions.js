import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Modal } from "react-native";
import React from "react";
import { reactQuestions } from "../config/question";
import tw from "twrnc";
import * as Progress from 'react-native-progress';

const Questions = ({ navigation }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]); // Estado que guarda as perguntas embaralhadas
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 🔀 Função para embaralhar array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 🚀 Embaralhar perguntas na primeira renderização
  useEffect(() => {
    const randomizedQuestions = shuffleArray(reactQuestions);
    setShuffledQuestions(randomizedQuestions);
  }, []);

  //Função que vai pra próxima pergunta
  const handleNext = () => {
    if (currentQuestionIndex === shuffledQuestions.length - 1) {
      navigation.navigate("Score", { score: score }); //Se for a ultima pergunta, redireciona para a página de Score e manda como parâmetro a pontuação do usuário
    } else {
      if (!selectedOption) { //Verifica se o usuário já selecionou alguma alternativa
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1); //Vai para a próxima pergunta
      setSelectedOption(null); //Reseta a variável salva a opção selecionada
      setIsCorrect(null); //Reseta a função que verifica se está correta
    }
  };

  //Função de clicar na opção e recebe a opção como parâmetro
  const handleOptionPress = (pressedOption) => {
    if (selectedOption) { //Verifica se já foi clicado
      return;
    }
    setSelectedOption(pressedOption); //Salva a opção selecionada
    const isAnwserCorrect =
      shuffledQuestions[currentQuestionIndex].correctAnswer === pressedOption;
    setIsCorrect(isAnwserCorrect);

    if (isAnwserCorrect) { //Se a opção for correta, ele adiciona mais 20 pontos
      setScore((prevScore) => prevScore + 20);
    }
  };

  //Chama o popup de desistir do quiz
  const handleExit = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  //🔄 Enquanto carrega as perguntas, mostra uma tela de loading
  if (shuffledQuestions.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Carregando perguntas...</Text>
      </View>
    );
  }

  return (
    <View style={tw`p-4 flex-1`}>
      <View style={tw`w-full items-center mb-5 mt-8 justify-center`}>
        <Progress.Bar
          color="rgb(59 130 246)"
          progress={(currentQuestionIndex + 1) / shuffledQuestions.length}
          width={400}
          height={15}
          borderColor="#ccc"
        />
        {/* ✅ Texto de progresso "Pergunta X de Y" */}
        <Text style={tw`text-base mt-2 text-gray-700 font-semibold`}>
          Pergunta {currentQuestionIndex + 1} de {shuffledQuestions.length}
        </Text>
      </View>

      {/*Título da pergunta com o index da pergunta (Ex.: 2.Pergunta...) */}
      <Text style={tw`text-2xl mb-4`}>
        {`${currentQuestionIndex + 1}.${shuffledQuestions[currentQuestionIndex].title}`}
      </Text>

      {/*Renderização de todas as perguntas de forma escalável, ou seja, pode adicionar quantas alternativas quiser lá em "questions.js" */}
      {shuffledQuestions[currentQuestionIndex].option.map((option, index) => (
        <Pressable
          key={index}
          style={tw`border-2 p-4 m-2 rounded-md ${
            selectedOption === option
              ? isCorrect
                ? "bg-green-100 border-green-500" //Verifica se está correta
                : "bg-red-100 border-red-500" //Verifica se está errada
              : "border-blue-500" //Valor padrão
          }`}
          onPress={() => {
            handleOptionPress(option);
          }}
        >
          <Text style={tw`text-lg`}>{option}</Text>
        </Pressable>
      ))}

      {/*Botão da próxima pergunta*/}
      <Pressable
        style={tw`bg-blue-800 p-4 rounded-md mt-6 ${
          selectedOption ? "opacity-100" : "opacity-60"
        }`}
        onPress={handleNext}
      >
        <Text style={tw`text-white text-lg text-center font-bold`}>
          {currentQuestionIndex === shuffledQuestions.length - 1
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
                style={tw`bg-gray-300 px-5 py-2 rounded-md`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-black font-bold`}>Não</Text>
              </Pressable>
              <Pressable
                style={tw`bg-red-500 px-5 py-2 rounded-md`}
                onPress={handleExit}
              >
                <Text style={tw`text-white font-bold`}>Sim</Text>
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
