"use client";
import ContainerRandomColorComponent from "@/components/custom/container-random-color.component";

import { Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

function Lobby() {
  const params = useSearchParams();

  const breatheAnimation = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

  const getParams = useCallback(() => {
    params.get("name");
    params.get("lobbyId");
  }, [params]);

  useEffect(() => {
    getParams();
  }, [getParams]);

  return (
    <>
      <Center h={"100vh"} display={"flex"} flexDir={"column"}>
        <Flex flexDir={"row"} fontSize={"5xl"}>
          <Text _dark={{ color: "gray.500" }} _light={{ color: "gray.600" }}>
            Lobby name:
          </Text>
          <Text ml={1} fontWeight={"bold"}>
            {params.get("lobbyId")}
          </Text>
        </Flex>
        {/* animation of brathing */}
        <Heading
          m={4}
          fontWeight={"bold"}
          fontSize={"3xl"}
          animation={`${breatheAnimation} 2s ease-in-out infinite`}
        >
          Waiting for players...
        </Heading>

        <Grid templateColumns="repeat(3, 1fr)" gap={6} m={4}>
          {/* container with random color */}
          <ContainerRandomColorComponent>
            <Center>
              <Text height={"100%"} color={"white"} fontWeight={"bold"}>
                Player 1
              </Text>
            </Center>
          </ContainerRandomColorComponent>
        </Grid>
      </Center>
    </>
  );
}

export default Lobby;
