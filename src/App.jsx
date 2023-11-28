import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Galeria } from "./Components/Galeria/Galeria";

function App() {
  return (
    <>
      <ChakraProvider>
        <CSSReset />
        <Header />
        {/* Establecer el estilo para el contenido principal */}
        <Box minH='90vh' >
          <Galeria />
        </Box>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
