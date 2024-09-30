import { VStack, Text, ScrollView, Avatar, Divider } from 'native-base'
import { Titulo } from '../componentes/Titulo'

export default function Perfil(){
  return(
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="yellow.500">Meu Perfil</Titulo>

        <Avatar size="xl" source={{ uri: "https://github.com/b4hia.png" }} mt={5} />

        <Titulo color="yellow.500">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>Gabriel Reis</Titulo>
        <Text>21/07/2004</Text>
        <Text>São Paulo</Text>

        <Divider mt={5} />

        <Titulo color="yellow.500" mb={1}>Histórico médico</Titulo>
        <Text>Catarata</Text>
        <Text>Diabetes Tipo 2</Text>
        <Text>Bronquite</Text>
      </VStack>
    </ScrollView>
  )
}