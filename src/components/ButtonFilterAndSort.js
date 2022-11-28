import { Box, Button, ButtonGroup, useMediaQuery } from "@chakra-ui/react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({filteringBy, handleFilteringBy, sortingBy, handleSortingBy}) {
  
  const [isLessThan512] = useMediaQuery('(max-width: 512px)')

  return (
    <Box display='flex' justifyContent={isLessThan512 ? 'center' : 'space-between'} flexWrap='wrap' alignItems='center'>

        <ButtonGroup m='2'>
        
          <Button _hover={{transform: 'scale(1.1)'}} transitionDuration='300ms' fontWeight='700' fontStyle='italic' fontSize='18' p='5' bg={filteringBy === '' ? 'rgba(97, 10, 236, 0.747)' : 'rgba(147, 33, 240, 0.55)'} onClick={() => handleFilteringBy('')}>All</Button>
          <Button _hover={{transform: 'scale(1.1)'}} transitionDuration='300ms' fontWeight='700'  fontStyle='italic' fontSize='18' p='5' bg={filteringBy === 'done' ? 'rgba(97, 10, 236, 0.747)' : 'rgba(147, 33, 240, 0.55)'} onClick={() => handleFilteringBy('done')}>Done</Button>
          <Button _hover={{transform: 'scale(1.1)'}} transitionDuration='300ms' fontWeight='700'  fontStyle='italic' fontSize='18' p='5' bg={filteringBy === 'undone' ? 'rgba(97, 10, 236, 0.747)' : 'rgba(147, 33, 240, 0.55)'} onClick={() => handleFilteringBy('undone')}>Undone</Button>
        
        </ButtonGroup>

        <Button onClick={() => sortingBy === 'desc' ? handleSortingBy('asc') : handleSortingBy('desc')}
        bg='#8ec4dd3a' color='rgba(91, 32, 139, 0.719)' fontSize='18'
        px='8'py='6' transitionDuration='300ms' fontStyle='italic' 
        mt={isLessThan512 && 1}
        rightIcon={<>
          <FaArrowCircleUp transform="scale(1.2)" color={sortingBy === 'asc' ? 'rgba(82, 11, 196, 0.918)' : 'rgba(91, 32, 139, 0.719)'}  />
          <FaArrowCircleDown transform="scale(1.2)" color={sortingBy === 'desc' ? 'rgba(82, 11, 196, 0.918)' : 'rgba(91, 32, 139, 0.719)'}  />
          </>
        }
        _hover={{transform: 'scale(1.1)'}}
        
        >Sort by Date
        </Button>
        
      </Box>
  );
}

export default ButtonFilterAndSort;
