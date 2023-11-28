import { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Button,
  Grid,
  Image as ChakraImage,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionImage = motion(ChakraImage);

const Galeria = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const bottomRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchTerm,
            per_page: 15,
            page: 1,
            client_id: "uUerkg5eiLHeqvqwCYhPVO0yamZktEoRqFPJihb-IgE",
          },
        }
      );

      const sortedImages = response.data.results
        .map((result) => ({
          id: result.id,
          url: result.urls.regular,
          alt: result.alt_description,
          height: result.height,
        }))
        .sort((a, b) => a.height - b.height);

      setImages(sortedImages);
      setPage(1);
    } catch (error) {
      console.error("Error obteniendo imágenes:", error);
    }
  };

  const handleBottomIntersect = async (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      try {
        const nextPage = page + 1;

        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: searchTerm,
              per_page: 15,
              page: nextPage,
              client_id: "uUerkg5eiLHeqvqwCYhPVO0yamZktEoRqFPJihb-IgE",
            },
          }
        );

        const newImages = response.data.results
          .map((result) => ({
            id: result.id,
            url: result.urls.regular,
            alt: result.alt_description,
            height: result.height,
          }))
          .sort((a, b) => a.height - b.height);

        setImages((prevImages) => [...prevImages, ...newImages]);
        setPage(nextPage);
      } catch (error) {
        console.error("Error obteniendo más imágenes:", error);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleBottomIntersect, {
      threshold: 0.1,
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [handleBottomIntersect]);

  // Nuevo efecto para limpiar la imagen seleccionada al cambiar la búsqueda
  useEffect(() => {
    setSelectedImage(null);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Box p={10} bg="#FDF7E4" position="relative" zIndex="1">
      <Box mt="60px">
        <HStack position="sticky" mt={0}>
          <InputGroup maxW="60%">
            <Input
              placeholder="Ingrese términos de búsqueda"
              value={searchTerm}
              _placeholder={{ color: "gray.500" }}
              _focusVisible={{ boxShadow: "none" }}
              fontSize="sm"
              flex="1"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  color="current"
                  onClick={handleClearSearch}
                  icon={<CloseIcon />}
                  borderColor="transparent"
                  _focus={{ borderColor: "transparent", bg: "none" }}
                  border="none"
                />
              </InputRightElement>
            )}
          </InputGroup>
          <Button
            onClick={handleSearch}
            minW='130px'
            height='40px'
            bg="#adb5bd"
            color="white"
            transition="all 0.3s ease"
            outline="none"
            borderRadius="10px"
            border="none"
            boxshadow="inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px  5px 0px rgba(0,0,0,.1)"
            _hover={{bg:'#ced4da'}}
          >
            Buscar
          </Button>
        </HStack>

        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
          {images.map((image, index) => (
            <MotionBox
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(image)}
            >
              <MotionImage
                src={image.url}
                alt={image.alt}
                width="100%"
                height="auto"
                layoutId={image.id}
              />
              {index === images.length - 1 && <div ref={bottomRef} />}
            </MotionBox>
          ))}
        </Grid>

        {/* Nuevo bloque para la imagen seleccionada con efecto de zoom */}
        {selectedImage && (
          <MotionBox
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.8)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="3"
            onClick={() => setSelectedImage(null)}
          >
            <MotionImage
              src={selectedImage.url}
              alt={selectedImage.alt}
              width="auto"
              height="auto"
              layoutId={selectedImage.id}
            />
          </MotionBox>
        )}
      </Box>
    </Box>
  );
};

export { Galeria };
