import React from "react"
import {View, Text, Image} from "react-native"

function App(){
  let nameCaba = "Arthur"
  return(
    <View style= {{padding: 20}}>
      <Text>${nameCaba}</Text>
      <Text style= {{color: "#F00FFF", fontSize: 35, fontWeight: 30}}>Meu primero App</Text>
      
  <Logo Largura ={100}  Altura ={100} Name ={"Fabrica do gás"}/>

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