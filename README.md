# Garments

Garments is a tiny CSS-in-JS library around React Native `style` prop that provides `styled-components`-like API. It includes features from different common CSS-in-JS libraries to simplify styling:

* `styled` API
* basic support of variants
* static theming
* props interpolation

## Installation

Using yarn:

```
yarn add @garments/react-native
```

Using npm:

```
npm install @garments/react-native
```

## Usage Example

```typescript
import { styled } from '@garments/react-native';
import { View } from 'react-native';

const Container = styled(View)({
  flex: 1,
})
```
