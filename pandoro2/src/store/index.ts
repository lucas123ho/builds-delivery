import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from './ducks';
import { UserState } from './ducks/user/types';
import { RouteState } from './ducks/route/types';
import { SaleState } from './ducks/sale/types';
import { GruposState } from './ducks/grupos/types';
import { PedidosState } from './ducks/pedidos/types';
import { ConfigState } from './ducks/config/types';

export interface ApplicationState {
  user: UserState;
  route: RouteState;
  sale: SaleState;
  grupos: GruposState;
  pedidos: PedidosState;
  config: ConfigState;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persitedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persitedReducer);
const persistor = persistStore(store);

export { store, persistor };
