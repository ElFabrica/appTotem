import React from "react"
import {View, Text, Image} from "react-native"

function App(){
  let foto = "https://static.vecteezy.com/system/resources/previews/022/600/817/large_2x/english-letter-a-for-kids-3d-letter-capital-a-small-a-free-vector.jpg"
  let nameCaba = "Arthur"
  return(
    <View style= {{padding: 20}}>
      <Text>${nameCaba}</Text>
      <Text style= {{color: "#F00FFF", fontSize: 35, fontWeight: 30}}>Meu primero App</Text>
      <Image
      source={{uri: foto}}
      style={{width: 200, height: 200}}
      ></Image>

      
    </View>
  )
}
export default App