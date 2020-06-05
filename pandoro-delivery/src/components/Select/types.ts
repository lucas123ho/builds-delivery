import { TouchableOpacityProps, ViewProps } from 'react-native';

export interface SelectProps extends ViewProps {
  title?: string;
  subTitle?: string;
  label?: string;
  button?: TouchableOpacityProps;
  info?: string;
}