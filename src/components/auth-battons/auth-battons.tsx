import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  Box,
  Button,
  Input,
  FormControl,
  IconButton,
  FormLabel,
} from '@chakra-ui/react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { cleanerLocal } from '../../redux/slice/user'
import { UserData } from '../../general-types'
import {
  Container,
  RegLogButtons,
  RegLogButton,
  RightButtons,
  InAccButtons,
  InfoUser,
  Modal,
  InfoWindow,
  ClouseIcon,
  Head,
  Text,
  InputForm,
  EnterButton,
  DeleteButton,
} from './auth.styled'

function AuthBattons({
  logining,
  register,
  deleteAcc,
}: {
  logining: (userData: UserData) => Promise<void>
  register: (userData: UserData) => Promise<void>
  deleteAcc: () => Promise<void>
}) {
  const dispatch = useAppDispatch()
  const { usernameAuth } = useAppSelector((state) => state.user)

  const [windowLogin, setWindowLogin] = useState(false)
  const handleWindowLogin = (booleanValue: boolean) =>
    setWindowLogin(booleanValue)

  const [windowRegistration, setWindowRegistration] = useState(false)
  const handleWindowRegistration = (booleanValue: boolean) =>
    setWindowRegistration(booleanValue)

  const [username, setUsername] = useState('')
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value)

  const [password, setPassword] = useState('')
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const clouseWindow = () => {
    setUsername('')
    setPassword('')
    handleWindowLogin(false)
    handleWindowRegistration(false)
  }

  const login = () => {
    const candidate = {
      username,
      password,
    }
    logining(candidate)
    setUsername('')
    setPassword('')
    clouseWindow()
  }

  const registrate = () => {
    const candidate = {
      username: `${username}`,
      password: `${password}`,
    }
    register(candidate)
    setUsername('')
    setPassword('')
    handleWindowRegistration(false)
  }

  const clearLocalStorage = () => {
    dispatch(cleanerLocal())
  }

  return (
    <Container>
      <RightButtons>
        {!usernameAuth && (
          <RegLogButtons>
            <RegLogButton
              position={'left'}
              onClick={() => handleWindowRegistration(true)}
            >
              Registration
            </RegLogButton>
            <RegLogButton
              position={'right'}
              onClick={() => handleWindowLogin(true)}
            >
              Login
            </RegLogButton>
          </RegLogButtons>
        )}

        {usernameAuth && (
          <InAccButtons>
            <InfoUser>
              <p>Login:</p>
              <p>{usernameAuth}</p>
            </InfoUser>
            <button onClick={clearLocalStorage}>Sign out</button>
          </InAccButtons>
        )}

        {(windowLogin || windowRegistration) && (
          <Modal onClick={() => clouseWindow()}>
            <InfoWindow onClick={(e) => e.stopPropagation()}>
              <ClouseIcon onClick={clouseWindow}>
                <AiOutlineCloseCircle />
              </ClouseIcon>

              <Head>
                {windowLogin && 'Log in please'}
                {windowRegistration && 'Registration'}
              </Head>
              <Text>Username:</Text>
              <InputForm
                id='input_1'
                type='text'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Enter login'
              ></InputForm>
              <Text>Password:</Text>
              <InputForm
                id='input_2'
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter password'
                onKeyDown={(e) => {
                  if (e.code === 'Enter' || e.key === '13') {
                    windowLogin && login()
                    windowRegistration && registrate()
                  }
                }}
              ></InputForm>

              <EnterButton
                onClick={() => {
                  windowLogin && login()
                  windowRegistration && registrate()
                }}
                type='submit'
              >
                {windowLogin && 'Log in'}
                {windowRegistration && 'Registration'}
              </EnterButton>
            </InfoWindow>
          </Modal>
        )}
      </RightButtons>
      
      {usernameAuth && (
        <DeleteButton>
          <button onClick={deleteAcc}>Delete account</button>
        </DeleteButton>
      )}
    </Container>
  )
}

export default AuthBattons
