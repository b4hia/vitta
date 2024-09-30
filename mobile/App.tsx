import { NativeBaseProvider, StatusBar } from "native-base";
import { TEMAS } from "./src/estilos/temas";
import Rotas from "./src/Rotas";
import React from "react";
import { CadastroProvider } from "./src/utils/cadastroContext";

export default function App() {
  return (
    <CadastroProvider>
      <NativeBaseProvider theme={TEMAS}>
        <StatusBar backgroundColor={TEMAS.colors.yellow[800]} />
        <Rotas />
      </NativeBaseProvider>
    </CadastroProvider>
  );
}
