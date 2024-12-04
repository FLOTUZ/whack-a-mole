"use client";

import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

import { Button, Container, Flex, HStack } from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import MoleComponent from "@/components/custom/mole.component";
import IWasHittedComponent from "@/components/custom/i-was-hitted.component";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL); // Conectamos al servidor de Socket.IO en el mismo dominio

export default function Mole() {
  const [showBlow, setShowBlow] = useState<{
    opened: boolean;
    hittedBy: string | null;
  }>({ opened: false, hittedBy: null });

  const [mole, setMole] = useState<{
    position: number;
    playerToHitId: string;
  }>({ position: 0, playerToHitId: "" });

  const handle = useFullScreenHandle();

  const playerName = "Mani";

  const players = useMemo(() => {
    return [
      {
        id: "1",
        name: "Kinn",
        img_url: "",
      },
      {
        id: "2",
        name: "Leo",
        img_url: "",
      },
      {
        id: "3",
        name: "Tere",
        image_url: "",
      },
      {
        id: "4",
        name: "Juanca",
        image_url: "",
      },
      {
        id: "5",
        name: "Leo",
        image_url: "",
      },
      {
        id: "6",
        name: "Erazo",
        image_url: "",
      },
      {
        id: "7",
        name: "Erazo",
        image_url: "",
      },
      {
        id: "8",
        name: "Erazo",
        image_url: "",
      },
    ];
  }, []);

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
      const randomPlayer = players[Math.floor(Math.random() * players.length)];

      setMole({
        position: Math.floor(Math.random() * 30),
        playerToHitId: randomPlayer.id,
      });
    }, Math.floor(Math.random() * 1000) + 500);
    return () => {
      clearInterval(interval);
    };
  }, [players]);

  return (
    <>
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
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
              <MoleComponent
                moleId={2}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
              <MoleComponent
                moleId={3}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
            </Flex>

            <HStack mt={"1rem"} gap={"2rem"}>
              <MoleComponent
                moleId={4}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
              <MoleComponent
                moleId={5}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
              <MoleComponent
                moleId={6}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
              <MoleComponent
                moleId={7}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
            </HStack>

            <HStack mt={"1rem"} gap={"2rem"}>
              <MoleComponent
                moleId={8}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
              <MoleComponent
                moleId={9}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
              <MoleComponent
                moleId={10}
                position={mole.position}
                onClick={() => hit({ moleId: mole.playerToHitId })}
              />
            </HStack>
          </Container>
        </IWasHittedComponent>
      </FullScreen>
    </>
  );
}
