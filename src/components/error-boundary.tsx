// import {
//   Box,
//   Heading,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionIcon,
//   AccordionPanel,
// } from "@chakra-ui/react";
// import * as React from 'react';
// import { useState } from "react";

// interface ErrorBoundaryProps {
//   error: {},
//   errorInfo: {}
// }

// const ErrorBoundary = ({error, errorInfo}:ErrorBoundaryProps) => {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = { error: null, errorInfo: null };
//   // }

//   // componentDidCatch(error: object, errorInfo: object) {
//   //   this.setState({
//   //     error: error,
//   //     errorInfo: errorInfo,
//   //   });
//   // }


//     if (errorInfo) {
//       return (
//         <Box
//           my="100"
//           mx="100"
//           p="50"
//           fontSize="20"
//           bg="rgba(250, 192, 3, 0.418)"
//           color="rgb(197, 2, 2)"
//           borderRadius="15"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           textAlign="center"
//         >
//           <Heading fontWeight="700" margin="5">
//             Something went wrong.
//           </Heading>

//           <Accordion allowToggle maxW="500px">
//             <AccordionItem display="flex" flexDirection="column">
//               <AccordionButton
//                 display="flex"
//                 justifyContent="center"
//                 mt="10"
//                 py="6"
//                 px="20"
//                 bg="rgba(250, 192, 3, 0.418)"
//                 borderRadius="5"
//               >
//                 <Box textAlign="center" fontSize="20" color="rgb(197, 2, 2)">
//                   Details
//                 </Box>
//                 <AccordionIcon />
//               </AccordionButton>

//               <AccordionPanel pt="5" display="flex" flexWrap="wrap">
//                 {error && error.toString()}
//                 {errorInfo.componentStack}
//               </AccordionPanel>
//             </AccordionItem>
//           </Accordion>
//         </Box>
//       );
//     }
//     return this.props.children;
// }

// export default ErrorBoundary;

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;