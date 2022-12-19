import { Box, Button, Container, IconButton } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface PaginationProps {
  setCurrentPage: (newNumber: number) => void
  currentPage: number
  taskAmount: number
  taskLimitPerPage: number
  tasksList: Array<object>
  loadingPage: boolean
}

function Pagination({
  setCurrentPage,
  currentPage,
  taskAmount,
  taskLimitPerPage,
  tasksList,
  loadingPage,
}: PaginationProps) {
  const pageNumbers: Array<number> = []

  for (let i = 1; i <= Math.ceil(taskAmount / taskLimitPerPage); i++) {
    pageNumbers.push(i)
  }

  function goToPage(result: any) {
    if (result === 'Left') {
      currentPage === 1
        ? setCurrentPage(currentPage)
        : setCurrentPage(currentPage - 1)
    } else if (result === 'Right') {
      currentPage === pageNumbers.length
        ? setCurrentPage(currentPage)
        : setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(result)
    }
  }

  return tasksList.length == 0 || pageNumbers.length === 1 ? (
    ' '
  ) : (
    <Box
      display='inline-flex'
      p='1'
      my='3'
      transform='scale(0.7)'
      alignItems='center'
      color='rgb(56, 27, 102)'
      borderRadius='5'
      border='1px solid rgba(139, 140, 141, 0.7)'
    >
      {currentPage >= 2 && (
        <IconButton
          onClick={() => goToPage('Left')}
          isDisabled={loadingPage}
          fontSize='18'
          transitionDuration='300ms'
          bg='rgba(0, 0, 0, 0)'
          _hover={{ bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.1)' }}
          icon={<IoIosArrowBack />}
          aria-label={''}
        />
      )}

      {currentPage > 2 && (
        <Button
          onClick={() => goToPage(1)}
          isDisabled={loadingPage}
          key={1}
          transitionDuration='300ms'
          fontSize='18'
          _hover={{ bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.2)' }}
          bg={
            1 === currentPage ? 'rgba(0, 84, 153, 0.192)' : 'rgba(0, 0, 0, 0)'
          }
        >
          {1}
        </Button>
      )}

      {currentPage > 3 && (
        <Container
          p='0'
          fontSize='16'
          bg='rgba(108, 0, 248, 0)'
          _hover={{ bg: 'none' }}
          cursor='default'
        >
          . . .
        </Container>
      )}

      {pageNumbers.map((item) => {
        if (
          item === currentPage ||
          item === currentPage - 1 ||
          item === currentPage + 1
        ) {
          return (
            <Button
              key={item}
              onClick={() => goToPage(item)}
              isDisabled={loadingPage}
              transitionDuration='300ms'
              fontSize='18'
              _hover={{
                bg: 'rgba(108, 0, 248, 0.274)',
                transform: 'scale(1.2)',
              }}
              bg={
                item === currentPage
                  ? 'rgba(0, 84, 153, 0.192)'
                  : 'rgba(0, 0, 0, 0)'
              }
            >
              {item}
            </Button>
          )
        }
        return null
      })}

      {currentPage < pageNumbers.length - 2 && (
        <Container
          p='0'
          fontSize='16'
          bg='rgba(108, 0, 248, 0)'
          _hover={{ bg: 'none' }}
          cursor='default'
        >
          . . .
        </Container>
      )}

      {currentPage < pageNumbers.length - 1 && (
        <Button
          onClick={() => goToPage(pageNumbers.length)}
          isDisabled={loadingPage}
          key={pageNumbers.length}
          transitionDuration='300ms'
          fontSize='18'
          _hover={{ bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.2)' }}
          bg={
            pageNumbers.length === currentPage
              ? 'rgba(0, 84, 153, 0.192)'
              : 'rgba(0, 0, 0, 0)'
          }
        >
          {pageNumbers.length}
        </Button>
      )}

      {currentPage < pageNumbers.length && (
        <IconButton
          onClick={() => goToPage('Right')}
          isDisabled={loadingPage}
          fontSize='18'
          transitionDuration='300ms'
          bg='rgba(0, 0, 0, 0)'
          _hover={{ bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.1)' }}
          icon={<IoIosArrowForward />}
          aria-label={''}
        />
      )}
    </Box>
  )
}

export default Pagination
