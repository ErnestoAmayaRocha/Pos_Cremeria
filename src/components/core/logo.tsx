'use client';

import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

import { NoSsr } from '@/components/core/no-ssr';

const HEIGHT = 180;
const WIDTH = 80;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

/* export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
  let url: string;

  if (emblem) {
    url = color === 'light' ? '/assets/logocreme.jpg' : '/assets/logocreme.jpg';
  } else {
    url = color === 'light' ? '/assets/logocreme.jpg' : '/assets/logocreme.jpg';
  }

  return <Box alt="logo" component="img" height={height} src={url} width={width} />;
} */


  export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
    let text: string;
  
    if (emblem) {
      text = color === 'light' ? 'Emblem Light' : 'Cremeria Rosita';
    } else {
      text = color === 'light' ? 'Logo Light' : 'Cremeria Rosita';
    }
  
    return (
      <Box height={height} width="80" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" style={{ color: color === 'light' ? '#FFFFFF' : '#000000' }}>
          {text}
        </Typography>
      </Box>
    );
  }

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo color={color} height={height} width={width} {...props} />
    </NoSsr>
  );
}
