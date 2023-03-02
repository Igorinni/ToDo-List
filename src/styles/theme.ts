import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
      global: {
        
        body: {
            bg: "linear-gradient(60deg, #eecfba8c, #c5dde877), url(https://images.squarespace-cdn.com/content/v1/566b24550e4c116bdcfa63ce/1497117339452-1SL5PDA5DIG7NO1I6ZH9/Writing+From+Where+You+Are.Web.png?format=2500w)",
            backgroundSize: "cover",
            padding: "30px",
            height: '100%',
            color: 'white',
            overflowY: 'scroll',
            backgroundAttachment: 'fixed',
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