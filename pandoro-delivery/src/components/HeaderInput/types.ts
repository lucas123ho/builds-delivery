import { ViewProps } from "react-native";

export interface HeaderInputProps extends ViewProps {
  onBack: () => void;
  search: string;
  setSearch: (text: string) => void;
}