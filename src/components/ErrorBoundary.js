import React from "react";
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Box
          my="100"
          mx="100"
          p="50"
          fontSize="20"
          bg="rgba(250, 192, 3, 0.418)"
          color="rgb(197, 2, 2)"
          borderRadius="15"
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Heading fontWeight="700" margin="5">
            Something went wrong.
          </Heading>

          <Accordion allowToggle maxW="500px">
            <AccordionItem display="flex" flexDirection="column">
              <AccordionButton
                display="flex"
                justifyContent="center"
                mt="10"
                py="6"
                px="20"
                bg="rgba(250, 192, 3, 0.418)"
                borderRadius="5"
              >
                <Box textAlign="center" fontSize="20" color="rgb(197, 2, 2)">
                  Details
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pt="5" display="flex" flexWrap="wrap">
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
