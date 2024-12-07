"use client";

import { useEffect, useState } from "react";

import { Button, Center, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import MoleComponent from "@/components/custom/mole.component";
import IWasHittedComponent from "@/components/custom/i-was-hitted.component";
import { socket } from "@/utils/socket";
import { useSearchParams } from "next/navigation";
import { Player } from "@/interfaces";
import { Image } from "@chakra-ui/react";

export default function Mole() {
  const params = useSearchParams();
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(90); // 90 seconds

  const [showBlow, setShowBlow] = useState<{
    opened: boolean;
    hittedBy: string | null;
  }>({ opened: false, hittedBy: null });

  const [mole, setMole] = useState<{
    position: number;
    playerToHitId: string;
    hittedName: string;
  }>({ position: 0, playerToHitId: "", hittedName: "" });

  const handle = useFullScreenHandle();

  function hit({ moleId }: { moleId: string }) {
    socket.emit("hit", playerName, moleId);
  }

  function recievedBlow(hittedBy: string) {
    console.log("recived_blow");
    setShowBlow({ opened: true, hittedBy: hittedBy });

    setTimeout(() => {
      setShowBlow({ opened: false, hittedBy: null });
    }, 1000);
  }

  useEffect(() => {
    socket.on("recived_blow", recievedBlow);

    return () => {
      socket.off("recived_blow", recievedBlow);
    };
  }, [showBlow]);

  // each ranom seconds between 500ms and 1 put a player on a mole
  useEffect(() => {
    const interval = setInterval(() => {
      if (players.length === 0) return;
      // Get a random player
      const randomPlayer = players[Math.floor(Math.random() * players.length)];

      setMole({
        position: Math.floor(Math.random() * 20),
        playerToHitId: randomPlayer.id,
        hittedName: randomPlayer.name,
      });
      console.log("random player", randomPlayer);
    }, Math.floor(Math.random() * 1000) + 500);
    return () => {
      clearInterval(interval);
    };
  }, [players]);

  // on close the tab the player leave the game
  useEffect(() => {
    setPlayerName(params.get("name"));
    let playersSaved = JSON.parse(localStorage.getItem("players") || "[]");

    // remove the current player from the list
    playersSaved = playersSaved.filter(
      (player: Player) => player.name !== params.get("name")
    );

    setPlayers(playersSaved);
  }, [params]);

  // time out to show the image after 5 seconds
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowImage(true);
    }, 90000);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  // regressive timer of 90 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {showImage ? (
        <Center display={"flex"} flexDirection={"column"}>
          <Image src="/monkey.jpg" h={200} alt="monkey hitting red button" />
          <Text mt={"1rem"}>Stop of taping and scrolling, take a breath, enjoy the life, not as me yesterday</Text>
          <Text m={"3rem"}>Made with ❤️ by Mani Codes</Text>
        </Center>
      ) : (
        <FullScreen handle={handle}>
          <IWasHittedComponent
            iWasHitted={showBlow.opened}
            hittedBy={showBlow.hittedBy}
          >
            <Container
              placeItems={"center"}
              overflowX={"hidden"}
              maxHeight={"100vh"}
            >
              <HStack w={"100%"}>
                <h1>Whack-a-mani</h1>
                <h1>Time: {timer}</h1>

                <Button
                  position={"absolute"}
                  top={"1rem"}
                  right={"1rem"}
                  ml={"auto"}
                  onClick={() => {
                    if (!handle.active) handle.enter();
                    else handle.exit();
                  }}
                >
                  {handle.active ? "Exit Fullscreen" : "Enter Fullscreen"}
                </Button>
              </HStack>
              {/* Row in horizontal */}
              <Flex mt={"1rem"} gap={"2rem"}>
                <MoleComponent
                  moleId={1}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
                <MoleComponent
                  moleId={2}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
                <MoleComponent
                  moleId={3}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
              </Flex>

              <HStack mt={"1rem"} gap={"2rem"}>
                <MoleComponent
                  moleId={4}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
                <MoleComponent
                  moleId={5}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
                <MoleComponent
                  moleId={6}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
                <MoleComponent
                  moleId={7}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
              </HStack>

              <HStack mt={"1rem"} gap={"2rem"}>
                <MoleComponent
                  moleId={8}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
                <MoleComponent
                  moleId={9}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
                <MoleComponent
                  moleId={10}
                  position={mole.position}
                  hittedName={mole.hittedName}
                  onClick={() => hit({ moleId: mole.playerToHitId })}
                />
              </HStack>
            </Container>
          </IWasHittedComponent>
        </FullScreen>
      )}
    </>
  );
}
