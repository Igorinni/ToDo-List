import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  Box,
  Button,
  Input,
  FormControl,
  Text,
  IconButton,
  FormLabel,
} from '@chakra-ui/react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { cleanerLocal } from '../redux/slice/userSlice'
import { UserData } from '../general-types'

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
    <Box
      display='flex'
      flexDirection='row-reverse'
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
    >
      <Box display='flex' flexDirection='row-reverse' alignItems='center'>
        {!usernameAuth && (
          <Box
            bg='rgba(167, 159, 207, 0.2)'
            borderRadius='10px'
            border='1px solid rgba(150, 150, 150, 0.2)'
          >
            <Button
              onClick={() => handleWindowRegistration(true)}
              color='rgba(91, 32, 139, 0.75)'
              size='sm'
              borderTopRightRadius='0'
              borderBottomRightRadius='0'
              borderRight='1px solid grey'
              bg='none'
              p='10px'
              _hover={{ bg: 'rgba(171, 156, 247, 0.4)' }}
            >
              Registration
            </Button>
            <Button
              onClick={() => handleWindowLogin(true)}
              color='rgba(91, 32, 139, 0.75)'
              borderTopLeftRadius='0'
              borderBottomLeftRadius='0'
              bg='none'
              size='sm'
              p='10px'
              _hover={{ bg: 'rgba(171, 156, 247, 0.4)' }}
            >
              Login
            </Button>
          </Box>
        )}

        {usernameAuth && (
          <Box
            bg='rgba(188, 209, 190, 0.5)'
            borderRadius='5px'
            display='flex'
            alignItems='center'
            p='2px'
            boxShadow='xs'
            flexWrap='wrap'
          >
            <Box display='flex' px='10px' borderRight='1px solid grey'>
              <Text color='rgba(0, 128, 0, 0.7)' mr='5px'>
                Login:
              </Text>
              <Text wordBreak='break-all' fontWeight='700' color='green'>
                {usernameAuth}
              </Text>
            </Box>
            <Button
              onClick={clearLocalStorage}
              bg='none'
              color='rgba(91, 32, 139, 0.819)'
              size='sm'
            >
              Sign out
            </Button>
          </Box>
        )}

        {(windowLogin || windowRegistration) && (
          <Box
            w='100%'
            h='100%'
            bg='rgba(0, 0, 0, 0.4)'
            position='fixed'
            top='0'
            left='0'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex='99'
            onClick={() => clouseWindow()}
          >
            <FormControl
              padding='20px'
              borderRadius='12px'
              backgroundColor='rgba(255, 255, 255, 1)'
              h='300px'
              w='370px'
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                aria-label='Clouse Window'
                onClick={clouseWindow}
                bg='none'
                _hover={{ bg: 'none' }}
                color='red'
                position='absolute'
                right='7px'
                top='7px'
                icon={<AiOutlineCloseCircle />}
                h='32px'
                fontSize='30'
              ></IconButton>
              <Text color='black' fontSize='25px' mb='10px'>
                {windowLogin && 'Log in please'}
                {windowRegistration && 'Registration'}
              </Text>
              <FormLabel fontSize='16px' color='black' mt='15px' mb='3px'>
                Username:
              </FormLabel>
              <Input
                id='input_1'
                type='text'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Enter login'
                color='black'
              ></Input>
              <FormLabel fontSize='16px' color='black' mt='15px' mb='3px'>
                Password:
              </FormLabel>
              <Input
                id='input_2'
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter password'
                color='black'
                onKeyDown={(e) => {
                  if (e.code === 'Enter' || e.key === '13') {
                    windowLogin && login()
                    windowRegistration && registrate()
                  }
                }}
              ></Input>
              <Button
                onClick={() => {
                  windowLogin && login()
                  windowRegistration && registrate()
                }}
                type='submit'
                bg='green'
                mt='25px'
                w='150px'
                fontSize='20px'
              >
                {windowLogin && 'Log in'}
                {windowRegistration && 'Registration'}
              </Button>
            </FormControl>
          </Box>
        )}
      </Box>
      {usernameAuth && (
        <Box>
          <Button
            onClick={deleteAcc}
            color='blackAlpha.500'
            bg='rgba(252, 83, 83, 0.2)'
            size='sm'
            _hover={{ bg: 'rgba(252, 83, 83, 0.5)', color: 'blackAlpha.800' }}
          >
            Delete account
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default AuthBattons
