import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      bg="#BBAB8C"
      color="#aaccee"
      position="sticky"
      w="100vw"
      boxShadow="dark-lg"
      p="10px"
      alignItems="center"
      mt='auto'
    >
      <Text color="white" fontSize="sm" textAlign='center'>
        © {currentYear} Luis Salazar. Todos los derechos reservados.
      </Text>
    </Box>
  );
};

export { Footer };
