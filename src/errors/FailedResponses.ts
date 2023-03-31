import { type Response } from '../types/Response';
export const FailedResponses = {
  invalidDataForUserCreation: <Response> {
    status: 400,
    body: 'Dados inválidos para criação de usuário'
  },
  invalidDataForContactCreation: <Response> {
    status: 400,
    body: 'Dados inválidos para contato'
  },
  invalidDataForEmailCreation: <Response> {
    status: 400,
    body: 'Endereço de email inválido'
  },
  userAlreadyExists: <Response> {
    status: 409,
    body: 'Usuário já cadastrado'
  },
  failedToLogin: <Response> {
    status: 403,
    body: 'Falha de autenticação'
  },
  forbiden: <Response>{
    status: 401,
    body: 'Acesso negado'
  }

};
