import React from 'react';
import { useTheme } from './context';
import type { ReactNativeStyle, Interpolation, FunctionInterpolation, CreateStyled } from './types';
import { omitStylingProps } from './utils';

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
