export interface UserState {
  id?: number;
  nome?: string;
  cpf?: string;
  telefone?: string;
  cep?: string;
  formatted_address?: string;
  complemento?: string;
  numero?: string;
  users_ids?: number[],
  latitude?: number;
  longitude?: number;
}

export interface UserTypes {
  SET_USER: string;
  SET_USERS_IDS: string;
}

export interface UserAction {
  type: string,
  payload: UserState
}