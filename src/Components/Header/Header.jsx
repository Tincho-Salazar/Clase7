import { Box, Container, Heading } from "@chakra-ui/react"

const Header = () => {
    return (
        <Box bg='#BBAB8C' color='#aaccee' 
            position='sticky' 
            w='100vw' 
            boxShadow='dark-lg' 
            p='10px' 
            alignItems='center'
            >
            <Container textAlign='center'>
                <Heading>Galeria de Imagenes</Heading>
            </Container>
        </Box>
    )
};

export { Header };