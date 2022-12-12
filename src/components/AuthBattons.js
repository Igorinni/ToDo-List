import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { registration, login, deleteUser, allUsers } from "../services/Auth";

function AuthBattons() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const handleDisplayLogin = (condition) => setDisplayLogin(condition);

  const [displayRegistration, setDisplayRegistration] = useState(false);
  const handleDisplayRegistration = (condition) =>
    setDisplayRegistration(condition);

  const [username, setUsername] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const clouseWindow = () => {
    setUsername("");
    setPassword("");
    handleDisplayLogin(false);
    handleDisplayRegistration(false);
  };

  const logining = async () => {
    try {
      const candidate = {
        username,
        password,
      };
      const response = await login(candidate);
      setUsername("");
      setPassword("");
      saveLocalStorage(response.token);
      clouseWindow();
    } catch (error) {
      console.log("Ошибка при входе");
    }
  };

  const registrate = async () => {
    try {
      const candidate = {
        username: `${username}`,
        password: `${password}`,
      };
      const response = await registration(candidate);
      setUsername("");
      setPassword("");
      clouseWindow();
    } catch (error) {
      console.log("Ошибка при регистрации");
    }
  };

  const saveLocalStorage = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
  };

  const updateLocalStorage = () => {
    localStorage.removeItem("token");
  };

  return (
    <Box /* position="fixed" */ /* float="right"  */ /* right="190px" */>
      <Button
        bg="#8ec4dd9a"
        color="rgba(91, 32, 159, 0.919)"
        onClick={() => handleDisplayLogin(true)}
      >
        Login
      </Button>
      <Button
        bg="#8ec4dd9a"
        color="rgba(91, 32, 139, 0.819)"
        onClick={() => handleDisplayRegistration(true)}
      >
        Registration
      </Button>
      <Button
        bg="#8ec4dd9a"
        color="rgba(91, 32, 139, 0.819)"
        onClick={updateLocalStorage}
      >
        Sign out
      </Button>

      {displayLogin && (
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
        >
          <Box
            padding="20px"
            borderRadius="12px"
            backgroundColor="rgba(255, 255, 255, 1)"
            h="250px"
            w="300px"
          >
            <Button bg="black" float="right" onClick={() => clouseWindow()}>
              X
            </Button>
            <Input
              value={username}
              onChange={handleUsernameChange}
              my="10px"
              placeholder="Enter login"
              color="black"
            ></Input>
            <Input
              value={password}
              onChange={handlePasswordChange}
              my="10px"
              placeholder="Enter password"
              color="black"
            ></Input>
            <Button bg="green" onClick={logining}>
              Log in
            </Button>
          </Box>
        </Box>
      )}

      {displayRegistration && (
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
        >
          <Box
            padding="20px"
            borderRadius="12px"
            backgroundColor="rgba(255, 255, 255, 1)"
            h="250px"
            w="300px"
          >
            <Button bg="black" float="right" onClick={clouseWindow}>
              X
            </Button>
            <Input
              value={username}
              onChange={handleUsernameChange}
              my="10px"
              placeholder="Enter login"
              color="black"
            ></Input>
            <Input
              value={password}
              onChange={handlePasswordChange}
              my="10px"
              placeholder="Enter password"
              color="black"
            ></Input>
            <Button bg="green" onClick={registrate}>
              Registration
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AuthBattons;
