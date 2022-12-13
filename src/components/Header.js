import { FaGg } from "react-icons/fa";
import { Box, Flex, Text } from "@chakra-ui/react";

function Header() {
  return (
    <Box
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      fontWeight="extrabold"
      fontStyle="italic"
      mt="5px"
      mb="15px"
    >
      <Flex alignItems="center" justifyContent="center">
        <Box color="#9728ca" fontSize="2xl">
          <FaGg />
        </Box>
        <Text mx="5" letterSpacing="10px" fontSize="5xl">
          ToDo
        </Text>
        <Box color="#9728ca" fontSize="2xl">
          <FaGg />
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
