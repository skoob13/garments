import React from 'react';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { ThemeContext } from './context';

export type Theme = ThemeContext['theme'];
// type ColorScheme = Required<ThemeContext>['colorScheme'];

export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;

export type ReactNativeStyleType<Props> = Props extends {
  style?: StyleProp<infer StyleType>;
}
  ? StyleType extends ReactNativeStyle
    ? StyleType
    : ReactNativeStyle
  : ReactNativeStyle;

interface WithComposers<StyleType extends ReactNativeStyle = ReactNativeStyle> {
  variants?: {
    [Key in string]: StyleType;
  };
}

type ComposersInStyle<StyleType extends ReactNativeStyle = ReactNativeStyle> = StyleType & WithComposers<StyleType>;

export interface FunctionInterpolation<MergedProps extends {}, StyleType extends ReactNativeStyle = ReactNativeStyle> {
  (mergedProps: MergedProps): ComposersInStyle<StyleType>;
}

export type Interpolation<MergedProps extends {}, StyleType extends ReactNativeStyle = ReactNativeStyle> =
  | FunctionInterpolation<MergedProps, StyleType>
  | ComposersInStyle<StyleType>;

export type StyledComponent<ComponentProps extends {}, Composers extends {} = {}> = React.FC<
  ComponentProps & Composers
>;

export interface CreateStyledComponent<
  ComponentProps extends {},
  StyleType extends ReactNativeStyle = ReactNativeStyle
> {
  /**
   * @typeparam StyledProps  Additional props to add to your styled component
   */
  <
    StyledProps extends {} = {},
    Style extends Interpolation<ComponentProps & StyledProps & { theme: Theme }, StyleType> = Interpolation<
      ComponentProps & StyledProps & { theme: Theme },
      StyleType
    >
  >(
    styles: Style
  ): StyledComponent<
    ComponentProps & StyledProps,
    Style extends FunctionInterpolation<ComponentProps & StyledProps & { theme: Theme }, StyleType>
      ? {
          // variant?: keyof ReturnType<Style>['variants'];
          variant?: string;
        }
      : typeof styles extends ComposersInStyle<StyleType>
      ? {
          variant?: keyof Style['variants'];
        }
      : {}
  >;
}

export interface CreateStyled {
  <C extends React.ComponentType<React.ComponentProps<C>>>(component: C): CreateStyledComponent<
    React.ComponentProps<C> & {},
    ReactNativeStyleType<React.ComponentProps<C> & {}>
  >;
}
