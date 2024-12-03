import { Box } from "@chakra-ui/react";

const MoleComponent = ({
  moleId,
  position,
  onClick,
  child,
}: {
  moleId: number;
  position: number;
  onClick: () => void;
  child?: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <Box
      height={"100px"}
      width={"100px"}
      bgColor={moleId == position ? "red" : "gray"}
      onClick={() => moleId == position && onClick()}
    >
      {child}
    </Box>
  );
};

export default MoleComponent;
