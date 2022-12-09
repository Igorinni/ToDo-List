import { Box, Container } from "@chakra-ui/react";

function Error({ errorText }) {
  return (
    <Box
      bg="rgb(252, 227, 9)"
      color="rgb(190, 7, 7)"
      position="absolute"
      top="5%"
      right="35%"
      left="35%"
      px="5%"
      py="5"
      borderRadius="7"
      fontSize="16"
      maxW="590px"
    >
      <Container>{errorText}</Container>
    </Box>
  );
}

export default Error;
