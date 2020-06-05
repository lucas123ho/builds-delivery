import { TextInputProps, StyleProp, ViewStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  label: string;
  info?: string;
  style?: StyleProp<ViewStyle>;
  onClean?: () => void;
}