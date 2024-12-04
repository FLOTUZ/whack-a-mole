import { Center } from "@chakra-ui/react";

const IWasHittedComponent = ({
  iWasHitted,
  hittedBy,
  children,
}: {
  iWasHitted: boolean;
  hittedBy: string | null;
  children?: React.ReactNode | React.ReactNode[];
}) => {
  return iWasHitted ? <Center h={"100vh"}>I were hitted by {hittedBy} </Center > : <>{children}</>;
};

export default IWasHittedComponent;
