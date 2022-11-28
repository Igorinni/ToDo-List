import { Box, Button, IconButton } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({setСurrentPage, currentPage, taskAmount, taskLimitPerPage, tasksList}) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(taskAmount / taskLimitPerPage); i++) {
    pageNumbers.push(i)
  }

  function goToPage(result){
  
    if (result === "Left") {
      (currentPage === 1) ? setСurrentPage(currentPage) : setСurrentPage(currentPage - 1)
    } else if (result === "Right") {
      (currentPage === pageNumbers.length) ? setСurrentPage(currentPage) : setСurrentPage(currentPage + 1)
    } else {
      setСurrentPage(result)
    }
    
  }  
 
  return (
    tasksList.length == 0 || pageNumbers.length === 1 ? ' ' :

    <Box 
    display='inline-flex' p='1' my='3' 
    color='rgb(56, 27, 102)' borderRadius='5' border='1px solid rgb(139, 140, 141)'>

      {currentPage >= 2 && 
      <IconButton onClick={() => goToPage("Left")}
        fontSize='12' transitionDuration='300ms' bg='rgba(0, 0, 0, 0)'
        _hover={{bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.1)'}}
        icon={<IoIosArrowBack />} />
      }
      
      {currentPage > 2 && <Button onClick={() => goToPage(1)} key={1}
        transitionDuration='300ms' fontSize='14'
        _hover={{bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.2)'}}
        bg={1 === currentPage ? 'rgba(0, 84, 153, 0.192)' : 'rgba(0, 0, 0, 0)'} 
        >{1}</Button>}

      {currentPage > 3 && <Button bg='rgba(108, 0, 248, 0)' _hover={{bg: 'none'}} cursor='default' >...</Button>}

      {pageNumbers.map((item) => {
        if (item === currentPage || item === currentPage - 1 || item === currentPage + 1) {
          return (      
            <Button
              key={item} onClick={() => goToPage(item)}
              transitionDuration='300ms' fontSize='14'
              _hover={{bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.2)'}}
              bg={item === currentPage ? 'rgba(0, 84, 153, 0.192)' : 'rgba(0, 0, 0, 0)'}
            >{item}
            </Button>)
        }
        return null;

      })}

      {currentPage < pageNumbers.length - 2 && <Button bg='rgba(108, 0, 248, 0)' _hover={{bg: 'none'}} cursor='default' >...</Button>}

      {currentPage < pageNumbers.length - 1 && <Button onClick={() => goToPage(pageNumbers.length)} key={pageNumbers.length}
        transitionDuration='300ms' 
        _hover={{bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.2)'}}
        bg={pageNumbers.length === currentPage ? 'rgba(0, 84, 153, 0.192)' : 'rgba(0, 0, 0, 0)'} 
      >{pageNumbers.length}</Button>}

      
      {currentPage < pageNumbers.length && <IconButton onClick={() => goToPage("Right")}
        fontSize='14' transitionDuration='300ms' bg='rgba(0, 0, 0, 0)'
        _hover={{bg: 'rgba(108, 0, 248, 0.274)', transform: 'scale(1.1)'}}
        icon={<IoIosArrowForward />} />
      }

      

    </Box>
    
  );
}

export default Pagination;
