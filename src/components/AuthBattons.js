import {
  Box,
  Button,
  Input,
  FormControl,
  Text,
  IconButton,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function AuthBattons({ logining, register, updateLocalStorage, usernameAuth }) {
  const [windowLogin, setWindowLogin] = useState(false);
  const handleWindowLogin = (condition) => setWindowLogin(condition);

  const [windowRegistration, setWindowRegistration] = useState(false);
  const handleWindowRegistration = (condition) =>
    setWindowRegistration(condition);

  const [username, setUsername] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const clouseWindow = () => {
    setUsername("");
    setPassword("");
    handleWindowLogin(false);
    handleWindowRegistration(false);
  };

  const login = () => {
    const candidate = {
      username,
      password,
    };
    logining(candidate);
    setUsername("");
    setPassword("");
    clouseWindow();
  };

  const registrate = () => {
    const candidate = {
      username: `${username}`,
      password: `${password}`,
    };
    register(candidate);
    setUsername("");
    setPassword("");
    handleWindowRegistration(false);
    handleWindowLogin(true);
  };

  return (
    <Box display="flex" flexDirection="row-reverse" alignItems="center">
      {!usernameAuth && (
        <Box bg="#8ec4dd4a" borderRadius="10px">
          <Button
            onClick={() => handleWindowRegistration(true)}
            color="rgba(91, 32, 139, 0.75)"
            size="sm"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            borderRight="1px solid grey"
            bg="none"
            p="10px"
          >
            Registration
          </Button>
          <Button
            onClick={() => handleWindowLogin(true)}
            color="rgba(91, 32, 139, 0.75)"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            bg="none"
            size="sm"
            p="10px"
          >
            Login
          </Button>
        </Box>
      )}
      {usernameAuth && (
        <Box
          bg="rgba(188, 209, 190, 0.5)"
          borderRadius="5px"
          display="flex"
          alignItems="center"
          p="2px"
          boxShadow="xs"
        >
          <Text display="flex" px="10px"  borderRight="1px solid grey">
            <Text color="rgba(0, 128, 0, 0.7)" mr="5px">Login:</Text>
            <Text fontWeight="700" color="green">{usernameAuth}</Text>
          </Text>
          <Button
            onClick={updateLocalStorage}
            bg="none"
            color="rgba(91, 32, 139, 0.819)"
            size="sm"
          >
            Sign out
          </Button>
        </Box>
      )}

      {(windowLogin || windowRegistration) && (
        <Box
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.4)"
          position="fixed"
          top="0"
          left="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="99"
          onClick={() => clouseWindow()}
        >
          <FormControl
            padding="20px"
            borderRadius="12px"
            backgroundColor="rgba(255, 255, 255, 1)"
            h="300px"
            w="370px"
            onClick={(e) => e.stopPropagation()}
            onSubmit
          >
            <IconButton
              onClick={clouseWindow}
              bg="none"
              _hover={{ bg: "none" }}
              color="red"
              position="absolute"
              right="7px"
              top="7px"
              icon={<AiOutlineCloseCircle />}
              h="32px"
              fontSize="30"
            ></IconButton>
            <Text color="black" fontSize="25px" mb="10px">
              {windowLogin && "Log in please"}
              {windowRegistration && "Registration"}
            </Text>
            <FormLabel fontSize="16px" color="black" mt="15px" mb="3px">
              Username:
            </FormLabel>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter login"
              color="black"
            ></Input>
            <FormLabel fontSize="16px" color="black" mt="15px" mb="3px">
              Password:
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              color="black"
              onKeyDown={(e) => {
                if (e.code === "Enter" || e.key === 13) {
                  windowLogin && login();
                  windowRegistration && registrate();
                }
              }}
            ></Input>
            <Button
              onClick={() => {
                windowLogin && login();
                windowRegistration && registrate();
              }}
              type="submit"
              bg="green"
              mt="25px"
              w="150px"
              fontSize="20px"
            >
              {windowLogin && "Log in"}
              {windowRegistration && "Registration"}
            </Button>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}

export default AuthBattons;
