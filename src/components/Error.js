import { Box, Container } from "@chakra-ui/react";

function Error({ errorText }) {
  return (
    <Box
      bg="rgb(252, 227, 9)"
      color="rgb(190, 7, 7)"
      position="fixed"
      px="10"
      py="5"
      top="1%"
      left="34%"
      borderRadius="7"
      fontSize="16"
      maxW="590px"
    >
      <Container>{errorText}</Container>
    </Box>
  );
}

export default Error;
