import { TouchableOpacityProps } from 'react-native';

import { TextProps as T } from '@styles/components/types';

export interface ButtonBottomProps extends TouchableOpacityProps {
  active?: boolean;
  text?: string;
  total?: number;
}

export interface TextButtonProps extends T {
  active?: boolean;
}