import React from 'react';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { ThemeContext, useTheme } from './context';
import { omitStylingProps } from './utils';

type Theme = ThemeContext['theme'];
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
    [key: string | number | symbol]: StyleType;
  };
}

type ComposersInStyle<StyleType extends ReactNativeStyle = ReactNativeStyle> = StyleType & WithComposers<StyleType>;

export interface FunctionInterpolation<MergedProps extends {}, StyleType extends ReactNativeStyle = ReactNativeStyle> {
  (mergedProps: MergedProps): ComposersInStyle<StyleType>;
}

export type Interpolation<MergedProps extends {}, StyleType extends ReactNativeStyle = ReactNativeStyle> =
  | FunctionInterpolation<MergedProps, StyleType>
  | ComposersInStyle<StyleType>;

// export type ComposerProps<MergedProps, StyleType extends ReactNativeStyle = ReactNativeStyle> = Interpolation<MergedProps,

export type StyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
  Composers extends {} = {}
> = React.FC<ComponentProps & SpecificComponentProps & JSXProps & Composers>;

export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  JSXProps extends {} = {},
  StyleType extends ReactNativeStyle = ReactNativeStyle
> {
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <
    AdditionalProps extends {} = {},
    Style extends Interpolation<
      ComponentProps & SpecificComponentProps & AdditionalProps & { theme: Theme },
      StyleType
    > = Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & { theme: Theme }, StyleType>
  >(
    styles: Style
  ): StyledComponent<
    ComponentProps & AdditionalProps,
    SpecificComponentProps,
    JSXProps,
    Style extends FunctionInterpolation<
      ComponentProps & SpecificComponentProps & AdditionalProps & { theme: Theme },
      StyleType
    >
      ? {
          variant?: keyof ReturnType<Style>['variants'];
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
    {},
    {},
    ReactNativeStyleType<React.ComponentProps<C>>
  >;
}

function isFunctionInterpolation<MergedProps extends {}, Style extends ReactNativeStyle>(
  styles: Interpolation<MergedProps, Style>
): styles is FunctionInterpolation<MergedProps, Style> {
  return typeof styles === 'function';
}

function hasStyleProp<MergedProps extends {}, Style extends ReactNativeStyle>(
  props: MergedProps
): props is MergedProps & { style: Style } {
  return 'style' in props;
}

export const styled: CreateStyled = (Component) => (styles) => (props) => {
  const { theme } = useTheme();
  const { variant, ...rest } = props as typeof props & { variant?: any };

  const { variants, ...interpolatedStyle } = isFunctionInterpolation(styles)
    ? styles({
        ...props,
        theme,
      })
    : styles;

  const variantStyle = variants?.[variant];

  const style = hasStyleProp(rest)
    ? Array.isArray(rest.style)
      ? [interpolatedStyle, variantStyle, ...rest.style]
      : [interpolatedStyle, variantStyle, rest.style]
    : variantStyle
    ? [interpolatedStyle, variantStyle]
    : interpolatedStyle;

  return React.createElement(Component as any, {
    ...omitStylingProps(rest),
    style,
  });
};
