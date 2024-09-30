import React, { createContext, useContext, useState } from 'react';

interface Endereco {
  cep?: string;
  rua?: string;
  numero?: string;
  estado?: string;
  complemento?: string;
}

interface CadastroData {
  rua: any;
  numero: any;
  estado: any;
  complemento: any;
  cep: any;
  cpf?: string;
  nome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  endereco?: Endereco;
  possuiPlanoSaude?: boolean;
  planosSaude?: number[];
  imagem?: string;
}

interface CadastroContextType {
  dados: CadastroData;
  setDados: React.Dispatch<React.SetStateAction<CadastroData>>;
}

const CadastroContext = createContext<CadastroContextType | undefined>(undefined);

export const CadastroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dados, setDados] = useState<CadastroData>({});

  return (
    <CadastroContext.Provider value={{ dados, setDados }}>
      {children}
    </CadastroContext.Provider>
  );
};

export const useCadastro = () => {
  const context = useContext(CadastroContext);
  if (!context) {
    throw new Error('useCadastro must be used within a CadastroProvider');
  }
  return context;
};
