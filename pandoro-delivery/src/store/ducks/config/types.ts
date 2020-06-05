export interface ConfigState {
  Store_Id?: number;
  qtdVolumeMax?: number;
  vlTotalMin?: number;
  vlTrocoMax?: number;
  DistanciaKmMax?: number;
  vlFreteInicial?: number;
  Latitude?: number;
  Longitude?: number;
  FatorKmFrete?: number;
  usaKmCobertura?: boolean;
  usaFreteFixo?: boolean;
}

export interface ConfigTypes {
  SET_CONFIG: string;
}

export interface ConfigAction {
  type: string,
  payload: ConfigState
}