import {FaGg} from "react-icons/fa";
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

function Header() {
  return (
      <Box bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text' fontSize='6xl'
          fontWeight='extrabold' fontStyle='italic'
          py='10'>

          <Flex alignItems='center' justifyContent='center'>

            <Box color='#9728ca' fontSize='4xl'><FaGg/></Box>
            <Box mx='7'>ToDo</Box> 
            <Box color='#9728ca' fontSize='3xl'><FaGg/></Box>

          </Flex>

      </Box>
  )
}

export default Header;
