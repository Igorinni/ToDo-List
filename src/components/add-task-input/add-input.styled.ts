import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background: white;
  border-radius: 7px;
  margin: 5px;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

export const AddInput = styled.input`
  color: black;
  width: 80%;
  font-size: 22px;
  padding: 2px;
`

export const AddBottom = styled.button<{ isLessThan550: boolean }>`
  padding: 6px 0px;
  border-radius: 6px;
  font-weight: 700;
  background-color: rgb(113, 199, 192);
  font-size: 20px;
  transition-duration: 300ms;
  width: 19%;
  ${({ isLessThan550 }) =>
    isLessThan550 &&
    `
      width: 100%;
      margin-top: 4px;
    `}
  :hover {
    transform: scale(1.05);
  }
`
