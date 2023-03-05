import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

export const RightButtons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export const RegLogButtons = styled.div`
  background-color: rgba(167, 159, 207, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(150, 150, 150, 0.2);
`
export const RegLogButton = styled.button<{ position: string }>`
  color: rgba(91, 32, 139, 0.75);
  background: none;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 700;
  transition: 300ms;
  :hover {
    background-color: rgba(171, 156, 247, 0.4);
  }

  ${({ position }) =>
    position === 'left'
      ? `
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: 1px solid black;
    `
      : ` 
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    `}
`
export const InAccButtons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 4px;
  border-radius: 5px;
  font-size: 16px;
  background-color: rgba(188, 209, 190, 0.5);
  button {
    padding: 4px 10px;
    border-radius: 5px;
    background: none;
    font-weight: 700;
    font-size: 15px;
    color: rgba(91, 32, 139, 0.819);
    transition: 300ms;
    :hover {
      background-color: rgba(152, 217, 67, 0.5);
    }
  }
`

export const InfoUser = styled.div`
  display: flex;
  padding: 0px 10px;
  border-right: 1px solid grey;
  p:first-child {
    margin-right: 5px;
    color: rgba(0, 128, 0, 0.7);
  }
  p:last-child {
    font-weight: 700;
    word-break: break-all;
    color: green;
  }
`

export const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
`

export const InfoWindow = styled.div`
  padding: 20px;
  width: 370px;
  height: 300px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 1);
`

export const ClouseIcon = styled.span`
  position: relative;
  top: -4%;
  left: 93%;
  color: red;
  background-color: none;
  :hover {
    cursor: pointer;
  }
  svg {
    width: 30px;
    height: 30px;
  }
`

export const Head = styled.p`
  font-size: 25px;
  color: black;
  margin-top: -30px;
`

export const Text = styled.p`
  margin-top: 15px;
  margin-bottom: 3px;
  text-align: left;
  font-size: 16px;
  color: black;
`

export const InputForm = styled.input`
  padding: 8px 15px;
  width: 100%;
  border: 1px solid rgba(143, 143, 143, 0.3);
  border-radius: 7px;
  color: black;
`

export const EnterButton = styled.button`
  margin-top: 20px;
  padding: 5px 0px;
  width: 150px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 7px;
  background-color: green;
`
export const DeleteButton = styled.div`
  button {
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    color: rgba(125, 125, 125, 0.8);
    background-color: rgba(252, 83, 83, 0.2);
    transition: 300ms;
    :hover{
      background-color: rgba(252, 83, 83, 0.5);
      color: rgba(0, 0, 0, 1)
    }
  }
`
