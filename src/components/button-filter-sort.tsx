import {
  Box,
  Button,
  ButtonGroup,
  Container,
  useMediaQuery,
} from '@chakra-ui/react'
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'

interface ButtonFilterAndSort {
  filteringBy: string
  handleFilteringBy: (value: string) => void
  sortingBy: string
  handleSortingBy: (value: string) => void
  loadingPage: boolean
}

const ButtonFilterAndSort = ({
  filteringBy,
  handleFilteringBy,
  sortingBy,
  handleSortingBy,
  loadingPage,
}: ButtonFilterAndSort) => {
  const [isLessThan539] = useMediaQuery('(max-width: 539px)')

  return (
    <Box
      display='flex'
      justifyContent={isLessThan539 ? 'center' : 'space-between'}
      flexWrap='wrap'
      alignItems='center'
    >
      <ButtonGroup m='2'>
        <Button
          isDisabled={loadingPage}
          _hover={{ transform: 'scale(1.1)' }}
          transitionDuration='300ms'
          fontWeight='700'
          fontStyle='italic'
          fontSize='18'
          p='5'
          bg={
            filteringBy === ''
              ? 'rgba(97, 10, 236, 0.747)'
              : 'rgba(147, 33, 240, 0.55)'
          }
          onClick={() => handleFilteringBy('')}
        >
          All
        </Button>
        <Button
          isDisabled={loadingPage}
          _hover={{ transform: 'scale(1.1)' }}
          transitionDuration='300ms'
          fontWeight='700'
          fontStyle='italic'
          fontSize='18'
          p='5'
          bg={
            filteringBy === 'done'
              ? 'rgba(97, 10, 236, 0.747)'
              : 'rgba(147, 33, 240, 0.55)'
          }
          onClick={() => handleFilteringBy('done')}
        >
          Done
        </Button>
        <Button
          isDisabled={loadingPage}
          _hover={{ transform: 'scale(1.1)' }}
          transitionDuration='300ms'
          fontWeight='700'
          fontStyle='italic'
          fontSize='18'
          p='5'
          bg={
            filteringBy === 'undone'
              ? 'rgba(97, 10, 236, 0.747)'
              : 'rgba(147, 33, 240, 0.55)'
          }
          onClick={() => handleFilteringBy('undone')}
        >
          Undone
        </Button>
      </ButtonGroup>

      <Button
        onClick={() =>
          sortingBy === 'desc'
            ? handleSortingBy('asc')
            : handleSortingBy('desc')
        }
        isDisabled={loadingPage}
        bg='#8ec4dd3a'
        color='rgba(91, 32, 139, 0.719)'
        fontSize='18'
        px='4'
        py='6'
        transitionDuration='300ms'
        fontStyle='italic'
        mt={isLessThan539 ? '1' : '0'}
        rightIcon={
          <>
            <Container w='5'>
              {sortingBy === 'asc' && (
                <FaArrowCircleUp
                  transform='scale(1.2)'
                  color='rgba(82, 11, 196, 0.918)'
                />
              )}
              {sortingBy === 'desc' && (
                <FaArrowCircleDown
                  transform='scale(1.2)'
                  color='rgba(82, 11, 196, 0.918)'
                />
              )}
            </Container>
          </>
        }
        _hover={{ transform: 'scale(1.1)' }}
      >
        Sort by Date
      </Button>
    </Box>
  )
}

export default ButtonFilterAndSort
