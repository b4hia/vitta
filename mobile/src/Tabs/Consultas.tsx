import { VStack, Divider, ScrollView } from 'native-base'
import { Botao } from '../componentes/Botao'
import { CardConsulta } from '../componentes/CardConsulta'
import { Titulo } from '../componentes/Titulo'

export default function Consultas(){
  return(
    <ScrollView p="5">
      <Titulo color="yellow.500">Minhas consultas</Titulo>
      <Botao mt={5} mb={5}>Agendar nova consulta</Botao>

      <Titulo color="yellow.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas consultas</Titulo>
      <CardConsulta 
        nome='Dr. Gerson'
        especialidade='Cardiologista'
        foto='https://github.com/gerson-pn.png'
        data='29/09/2024'
        foiAgendado
      />

      <Divider mt={5} />

      <Titulo color="yellow.500" fontSize="lg" alignSelf="flex-start" mb={2}>Consultas passadas</Titulo>
      <CardConsulta 
        nome='Dr. Gabriel'
        especialidade='Cardiologista'
        foto='https://github.com/b4hia.png'
        data='20/09/2024'
        foiAtendido
      />
      <CardConsulta 
        nome='Dr. Luciano'
        especialidade='Cardiologista'
        foto='https://github.com/b4hia.png'
        data='20/09/2024'
        foiAtendido
      />
      <CardConsulta 
        nome='Dr. Andre'
        especialidade='Cardiologista'
        foto='https://github.com/b4hia.png'
        data='20/09/2024'
        foiAtendido
      />
    </ScrollView>
  )
}