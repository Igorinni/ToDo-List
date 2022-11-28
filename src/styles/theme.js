import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
      global: {
        
        body: {
            bgGradient: 'linear-gradient(45deg, #c3c4fa, #c6f3d9)',
            color: 'white',
        },
        
        a: {
          color: 'teal.500',
          _hover: {
            textDecoration: 'underline',
          },
        },

        li: {
            listStyle: 'none',
        },

        button: {
            cursor: 'pointer',
        },
      },
    },
})

export default theme;