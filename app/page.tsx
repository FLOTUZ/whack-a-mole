"use client";

import BoomModal from "@/components/custom/boom.modal";
import { Container, Flex, HStack } from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import MoleComponent from "@/components/custom/mole.component";

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
    <Container maxW={"100%"}>
      {/* Row in horizontal */}
      <Flex mt={"1rem"}>
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
      </Flex>

      <HStack mt={"1rem"}>
        <MoleComponent
          moleId={3}
          position={mole.position}
          onClick={() => hit({ moleId: mole.playerToHitId })}
        />
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
      </HStack>

      <HStack mt={"1rem"}>
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

      <BoomModal opened={showBlow.opened} hittedBy={showBlow.hittedBy} />
    </Container>
  );
}
