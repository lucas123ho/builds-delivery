import { InputProps } from "../Input/types";
import { GestureResponderEvent, NativeSyntheticEvent, TextInputEndEditingEventData } from "react-native";

interface Title {
  text: string;
  destaque: string;
}

export interface PageCadastroProps {
  title: Title;
  input: InputProps;
  value: string;
  onSubmit: (event: GestureResponderEvent | NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  optional?: boolean;
  condition?: boolean;
}
