import React from 'react';
import { Image, View } from 'react-native';
import { styled } from '../src';

const Component1 = styled(View)({
  flex: 1,
});

export function RenderComponent1() {
  return <Component1 />;
}

const Component2 = styled(View)<{ $flex: number }>(({ $flex }) => ({
  flex: $flex,
}));

export function RenderComponent2() {
  return <Component2 $flex={1} />;
}

const Component3 = styled(Image)<{ $tintColor?: string }>((props) => ({
  tintColor: props.$tintColor,
}));

export function RenderComponent3Ver1() {
  return <Component3 $tintColor="red" />;
}

export function RenderComponent3Ver2() {
  return <Component3 />;
}

const Component4 = styled(View)({
  aspectRatio: 16 / 9,
  variants: {
    square: {
      aspectRatio: 1,
    },
  },
});

export function RenderComponent4Ver1() {
  return <Component4 variant="square" />;
}

export function RenderComponent4Ver2() {
  return <Component4 />;
}

const Component5 = styled(View)({
  variants: {
    square: {
      aspectRatio: 1,
    },
    portrait: {
      aspectRatio: 9 / 16,
    },
    landscape: {
      aspectRatio: 16 / 9,
    },
  },
});

export function RenderComponent5Ver1() {
  return <Component5 variant="portrait" />;
}

export function RenderComponent5Ver2() {
  return <Component5 />;
}

const Component6 = styled(View)(() => ({
  variants: {
    square: {
      aspectRatio: 1,
    },
  },
}));

export function RenderComponent6Ver1() {
  return <Component6 variant="square" />;
}

export function RenderComponent6Ver2() {
  return <Component6 />;
}

const Component7 = styled(View)<{ $ratio: number }>((props) => ({
  variants: {
    square: {
      aspectRatio: props.$ratio,
    },
  },
}));

export function RenderComponent7Ver1() {
  return <Component7 $ratio={1} variant="square" />;
}

export function RenderComponent7Ver2() {
  return <Component7 $ratio={1} />;
}
