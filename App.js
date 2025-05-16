import React, {useState} from "react"
import {View, Text, Image, Button, StyleSheet, TextInput} from "react-native"

function App(){
  const [nome, setNome] = useState("")
  const [email, setIdade] = useState("")
  const [phone, setphone] = useState("")
  

  function entrar(name, email, phone){
    setNome(name)
    setIdade(email)
    setphone(phone)
    alert ("Entrou!!!")
  }
  return(
    
    <View style= {styles.main}>

      <View style= {styles.div}>
      <Logo Largura ={100}  Altura ={100} Name ={"Fabrica do gás"}/>

      <Text style= {styles.Titulo}>Cadastre-se</Text>
      <Text style= {styles.subtitulo}>Nome</Text>
      <TextInput id="nome" style= {styles.input}></TextInput>

      <Text style= {styles.subtitulo}>Email</Text>
      <TextInput id="email" style= {styles.input}></TextInput>

      <Text style= {styles.subtitulo}>Telefone</Text>
      <TextInput id="phone" style= {styles.input}></TextInput>

      <Button title = "Mudar Nome" onPress={()=> entrar(TextInput.nome, TextInput.email, TextInput.nome)} style = {styles.Button} />
  </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main:{
  padding: 20
  },

  div: {
    textAlign:"center",
    alignContent: "center"
  },

  input:{
 borderColor: "#333333",
 borderWidth: 1,
 borderRadius: 10

},

  Titulo:{
  fontSize: 30,
   textAlign:"center",
  Color: "#333333"
  },

  subtitulo:{
  fontSize: 20
  },
  Button:{
    marginTop: 20
  }
});
export default App

function Logo(propos){
  let img = "https://static.vecteezy.com/system/resources/previews/022/600/817/large_2x/english-letter-a-for-kids-3d-letter-capital-a-small-a-free-vector.jpg"
  return(
    <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
    <Image source={{ uri: img }} style= {{ width: propos.Largura, height: propos.Altura}}>
      </Image>
      
      </View>

    
  )
}
