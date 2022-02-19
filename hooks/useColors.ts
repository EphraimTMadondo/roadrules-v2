import { useMantineTheme } from '@mantine/core';

export function useColors () {

  const theme = useMantineTheme();

  const primary = theme.colors.green[ 9 ];

  const secondary = theme.colors.dark[ 0 ];

  return { primary, secondary };

}