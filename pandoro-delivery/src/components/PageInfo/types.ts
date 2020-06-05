import { ImageProps, TouchableOpacityProps } from 'react-native';

export interface Button extends TouchableOpacityProps {
  text?: string;
}

export interface PageInfoProps {
  image: ImageProps;
  title: string;
  text: string;
  button?: Button;
  button2?: Button;
  animationTime?: number
}