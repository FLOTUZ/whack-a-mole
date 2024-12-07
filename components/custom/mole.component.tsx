import { Box, Text } from "@chakra-ui/react";

const MoleComponent = ({
  moleId,
  position,
  onClick,
  hittedName,
}: {
  moleId: number;
  position: number;
  hittedName: string;
  onClick: () => void;
}) => {
  return (
    <Box
      height={"100px"}
      width={"100px"}
      as="button"
      display="inline-block"
      bg="teal.500"
      color="white"
      fontWeight="bold"
      px={6}
      py={3}
      borderRadius="md"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
      transform="translateY(0)"
      transition={"transform 0.5s, box-shadow 0.2s"}
      _active={{
        transform: moleId == position ? "translateY(20px)" : "translateY(0)",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
      bgColor={moleId == position ? "red" : "gray"}
      onClick={() => moleId == position && onClick()}
    >
     {
      moleId == position && <Text>{hittedName}</Text>
     }
    </Box>
  );
};

export default MoleComponent;
