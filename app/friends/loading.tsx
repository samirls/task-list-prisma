import { Box, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
  <Box display='flex' flexDir='column' justifyContent='center' alignItems='center' width='100%' height='500px'>
    <Box>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Box>
  </Box>
  )
}
