import { Image, Text, Box, Checkbox, ScrollView, useToast } from "native-base";
import Logo from "./assets/Logo.png"; // Ajuste o caminho conforme necessário
import { Titulo } from "./componentes/Titulo";
import { EntradaTexto } from "./componentes/EntradaTexto";
import { Botao } from "./componentes/Botao";
import { useState } from "react";
import { secoes } from "./utils/CadastroEntradaTexto"; // Certifique-se que este caminho está correto
import { useNavigation } from "@react-navigation/native"; // Para navegação
import api from "./service/api"; // Caminho para o serviço da API
import axios from "axios";
import { useCadastro } from "./utils/cadastroContext";

export const Cadastro = () => {
  const { dados, setDados } = useCadastro(); // Use o contexto
  const [numSecao, setNumSecao] = useState(0);
  const [planos, setPlanos] = useState([] as number[]);
  const toast = useToast();
  const navigation = useNavigation();

  const alternarSecao = (opcao: "avancar" | "voltar") => {
    if (opcao === "avancar") {
      if (numSecao < secoes.length - 1) {
        setNumSecao(numSecao + 1);
      } else {
        cadastrar(); // Chama a função de cadastro ao final
      }
    } else if (opcao === "voltar") {
      if (numSecao > 0) {
        setNumSecao(numSecao - 1);
      }
    }
  };

  const atualizarDados = (id: string, valor: string) => {
    setDados((prevDados) => ({ ...prevDados, [id]: valor })); // Atualiza os dados do formulário
  };

  async function cadastrar() {
    const dadosParaCadastro = {
      cpf: dados.cpf,
      nome: dados.nome,
      email: dados.email,
      endereco: {
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        estado: dados.estado,
        complemento: dados.complemento,
      },
      senha: dados.senha,
      telefone: dados.telefone,
      possuiPlanoSaude: planos.length > 0,
      planosSaude: planos,
      imagem: dados.imagem,
    };
    // Validação simples dos dados
    if (
      !dados.cpf ||
      !dados.nome ||
      !dados.email ||
      !dados.senha ||
      !dados.telefone
    ) {
      toast.show({
        title: "Erro de validação",
        description: "Todos os campos obrigatórios devem ser preenchidos.",
        backgroundColor: "red.500",
      });
      return;
    }

    console.log(
      "Dados para cadastro:",
      JSON.stringify(dadosParaCadastro, null, 2)
    );

    // Continuação da função de cadastro
    try {
      const resultado = await api.post("/register", dadosParaCadastro);

      if (resultado) {
        toast.show({
          title: "Cadastro realizado com sucesso",
          description: "Você já pode fazer login",
          backgroundColor: "green.500",
        });
        navigation.replace("Login"); // Navega para a tela de login
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro durante o cadastro:",
          error.response?.data || error.message
        );
        // Exibir mensagem de erro retornada pela API, se disponível
        toast.show({
          title: "Erro ao cadastrar",
          description:
            error.response?.data?.message ||
            "Ocorreu um erro inesperado, tente novamente.",
          backgroundColor: "red.500",
        });
      } else {
        console.error("Erro inesperado:", error);
        toast.show({
          title: "Erro ao cadastrar",
          description: "Ocorreu um erro inesperado, tente novamente.",
          backgroundColor: "red.500",
        });
      }
    }
  }

  return (
    <ScrollView flex={1} p={5}>
      <Image source={Logo} alt="Logo Voll" alignSelf={"center"} mt={10} />

      <Box mt={16}>
        <Titulo>{secoes[numSecao].titulo}</Titulo>

        <Box>
          {secoes[numSecao]?.entradaTexto?.map((item) => (
            <EntradaTexto
              key={item.id}
              label={item.label}
              placeholder={item.placeholder}
              secureTextEntry={item.secureTextEntry}
              value={dados[item.nome]} // Use `item.name` como chave para os dados
              onChangeText={(text) => atualizarDados(item.nome, text)} // Atualiza os dados no estado
            />
          ))}
        </Box>

        <Box>
          {secoes[numSecao]?.checkbox && (
            <Text color={"blue.800"} fontWeight={"bold"} fontSize={"md"} my={2}>
              Selecione o plano:
            </Text>
          )}

          {secoes[numSecao]?.checkbox?.map((checkbox) => (
            <Checkbox
              key={checkbox.id}
              value={checkbox.value}
              onChange={() => {
                setPlanos((planosAnteriores) => {
                  if (planosAnteriores.includes(checkbox.id)) {
                    return planosAnteriores.filter((id) => id !== checkbox.id);
                  }
                  return [...planosAnteriores, checkbox.id];
                });
              }}
              isChecked={planos.includes(checkbox.id)} // Marca o checkbox se o plano estiver selecionado
            >
              {checkbox.value}
            </Checkbox>
          ))}
        </Box>
      </Box>

      {numSecao > 0 && (
        <Botao
          onPress={() => alternarSecao("voltar")}
          bgColor={"gray.500"}
          mb={-6}
        >
          Voltar
        </Botao>
      )}

      <Botao onPress={() => alternarSecao("avancar")} mb={10}>
        {numSecao === secoes.length - 1 ? "Finalizar cadastro" : "Avançar"}
      </Botao>
    </ScrollView>
  );
};

export default Cadastro;
