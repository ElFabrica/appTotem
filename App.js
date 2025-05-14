import React, {useState} from "react"
import {View, Text, Image, Button} from "react-native"

function App(){
  const [nome, setNome] = useState("Fabrica")
  const [idade, setIdade] = useState(10)

  function entrar(name, idade){
    setNome(name)
    setIdade(idade)
    alert ("Entrou!!!")
  }
  return(
    
    <View style= {{padding: 20}}>
      <Logo Largura ={100}  Altura ={100} Name ={"Fabrica do gás"}/>
      <Text>{nome}</Text>
       <Text>{idade}</Text>
      <Text style= {{color: "#F00FFF", fontSize: 35, fontWeight: 30}}>
      Meu primero App
      </Text>
      <Button title = "Mudar Nome" onPress={()=> entrar("Arthur Fabrigas", 18)} />
  

    </View>
  )
}
export default App

function Logo(propos){
  let img = "https://static.vecteezy.com/system/resources/previews/022/600/817/large_2x/english-letter-a-for-kids-3d-letter-capital-a-small-a-free-vector.jpg"
  return(
    <View>
    <Image source={{ uri: img }} style= {{ width: propos.Largura, height: propos.Altura }}>
      </Image>
      <Text>
        {propos.Name}
      </Text>
      </View>

    
  )
}