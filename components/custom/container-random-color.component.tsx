"use client";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { useEffect, useState } from "react";
const ContainerRandomColorComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bgColor, setbgColor] = useState<string>();

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const textColor = useColorModeValue("white", "black");

  useEffect(() => {
    setbgColor(getRandomColor());
  }, []);

  return (
    <Box
      bg={bgColor}
      color={textColor}
      p={4}
      minW={"40px"}
      rounded={"full"}
      borderRadius="md"
      textAlign="center"
    >
      {children}
    </Box>
  );
};

export default ContainerRandomColorComponent;
