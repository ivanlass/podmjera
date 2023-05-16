import React from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';


interface IProps {
    text?: string;
}

function FullPageSpinner({ text }: IProps) {

  return (
    <Box width='100%' height='100vh' top='0' pos='fixed' display='flex' alignItems='center' justifyContent='center' flexDir='column'>
        <Spinner size='xl' thickness='4px' speed='1.3s' color='primary.500' emptyColor='neutral.10'/>
        {text && <Text textAlign='center' fontSize={{base:'md', md:'2xl'}} fontWeight='bold' my='8'>{text}</Text>}
    </Box>
  )

  
}

export default FullPageSpinner;
