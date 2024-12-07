"use client";
import ContainerRandomColorComponent from "@/components/custom/container-random-color.component";

import { Button, Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { socket } from "@/utils";
import { Player } from "@/interfaces";

function Lobby() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [roomName, setRoomName] = useState<string | null>(null);
  const params = useSearchParams();

  const breatheAnimation = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

  const onStartGame = useCallback(() => {
    router.push(`/game/play`);
  }, [router]);

  useEffect(() => {
    socket.emit("playerJoined", params.get("name"), params.get("lobbyId"));

    socket.on("startGame", onStartGame);

    return () => {
      socket.off("startGame", onStartGame);
    };
  }, [onStartGame, params]);

  // Update the players list when the "playersList" event is received from the server
  useEffect(() => {
    socket.on("playersList", ({ playersList }: { playersList: Player[] }) => {
      setPlayers(playersList);
    });

    socket.on("roomName", ({ roomName }: { roomName: string }) => {
      setRoomName(roomName);
    });

    return () => {
      socket.off("playersList");
      socket.off("roomName");
    };
  }, []);

  return (
    <>
      <Center h={"100vh"} display={"flex"} flexDir={"column"}>
        <Flex flexDir={"row"} fontSize={"5xl"}>
          <Text _dark={{ color: "gray.500" }} _light={{ color: "gray.600" }}>
            Lobby name:
          </Text>
          <Text ml={1} fontWeight={"bold"}>
            {roomName}
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
          {players.map((player, index) => (
            <ContainerRandomColorComponent key={index}>
              <Center>
                <Text height={"100%"} color={"white"} fontWeight={"bold"}>
                  {player.name}
                </Text>
              </Center>
            </ContainerRandomColorComponent>
          ))}
        </Grid>
        {/* for the first user in array the button will appear for start the game */}
        {players.length > 0 && players[0].name === params.get("name") && (
          <Button
            m={4}
            colorScheme="green"
            onClick={() => {
              socket.emit("startGame");
            }}
          >
            Start game
          </Button>
        )}
      </Center>
    </>
  );
}

export default Lobby;
