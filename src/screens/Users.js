import { View, Text, ScrollView, Pressable } from 'react-native';
import { createStore } from "tinybase";
import { useEffect, useState } from 'react';
import tw from 'twrnc';
import { store, TABLE_NAME, initializeStore } from "../config/store.js"


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [responseData, setResponseData] = useState(null);

  // Função para obter os dados da tabela

  const UpdateItems = async ({id, name, email}) => {
    try {
      const data = {
        email: email,
        name: name,
        id: id
      }

      const response = await fetch("https://nasago.bubbleapps.io/version-test/api/1.1/wf/form_totem", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      setResponseData(response.data); // Atualiza o estado com a resposta
      console.log(response.data); // Exibe no console a resposta do servidor
    } catch (error) {
      console.error('Erro:', error); // Captura e exibe erros
    }
    ;
  };

  const loopUpdateItems = async () => {
    for (let item of users) {
    await UpdateItems({id:item.id, name:item.name, email:item.email}); // Aguarda a requisição terminar antes de passar para a próxima
  }
};
  
  function get() {
    const data = store.getTable(TABLE_NAME);
    const response = Object.entries(data).map(([id, user]) => ({
      id,
      name: String(user.name),
      email: String(user.email),

    }));

    setUsers(response);
    console.log(data);
  }
  
  

  // Adicionar um listener para monitorar mudanças na tabela
  useEffect(() => {
      const loadData = async () => {
        try {
          console.log("Inicializando store...");
          await initializeStore();  // Certifique-se de que a inicialização do store está correta
          console.log("Store pronto!");
          setLoaded(true);  // Atualize o estado para refletir que o banco foi carregado
        } catch (e) {
          console.error("Erro ao inicializar banco:", e);
          Alert.alert("Erro", "Não foi possível carregar o banco de dados.");
        }
      };
  get()
      loadData();
    }, []);

    
  return (
    <View style={tw`flex-1 items-center mt-8 px-4`}>
      <Text style={tw`text-xl font-medium`}>Inscritos</Text>
      <View style={tw`mt-6 w-full `}>
        <View style={tw`flex-row  justify-between`}>
        <Text style={tw`text-2xl text-center min-w-36 `}>Nome</Text>
         <Text style={tw`text-2xl text-center min-w-36`}>Email</Text>
         </View>
        {users.length > 0 ? (users.map((item) => (
            <View key={item.id} style={tw`flex-row  justify-between`}>
              <Text style={tw`text-xl text-base text-center min-w-36`}>{item.name}</Text>
              <Text style={tw`text-xl text-base text-center min-w-36`}>{item.email}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhum dado encontrado...</Text>
        )}
        <View style={tw `justify-center items-center`}>
      <Pressable style={tw` bg-purple-500 p-4 rounded-md mt-6  max-w-40`} onPress={loopUpdateItems}>
        <Text style={tw`text-white font-bold`}> Subir dados</Text>
      </Pressable>
      </View>
  </View>
  </View>
  )}