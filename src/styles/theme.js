import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';
import { StyleFunctionProps } from '@chakra-ui/styled-system';


const theme = extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
            bgGradient: 'linear-gradient(45deg, #c3c4fa, #c6f3d9)',
            color: 'white',
        },
        // styles for the `a`
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