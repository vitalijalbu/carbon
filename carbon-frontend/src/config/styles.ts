export const styles = {
    Button: (theme, params: ButtonStylesParams) => ({
      // Shared button styles are applied to all buttons
      root: { height: 42, padding: '0 30px' },

      filled: {
        // subscribe to component params
        color: theme.colors[params.color || theme.primaryColor][1],
      }
    }),
  };
  