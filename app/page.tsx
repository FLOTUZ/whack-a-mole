"use client";

import { Field } from "@/components/ui/field";
import { Box, Button, Center, Heading, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const lobbyId = formData.get("lobbyId") as string;
    router.push(`/game?name=${name}&lobbyId=${lobbyId}`);
  }

  return (
    <Box height={"100vh"}>
      <Heading m={4}>Whack-a-mani</Heading>
      <Center>
        <Box
          m={10}
          p={8}
          rounded={"md"}
          h={"50%"}
          w={"50%"}
          _light={{ shadow: "lg" }}
          _dark={{ bgColor: "gray.800" }}
        >
          <form onSubmit={onSubmit}>
            <VStack>
              <Field
                label="Lobby identifier"
                helperText="Name of the lobby"
              >
                <Input name="lobbyId" placeholder="Example: Hugs not bullets" variant="subtle" autoComplete="off" />
              </Field>
              <Field
                label="Player Name"
                required
                helperText=" Enter your name or nickname"
              >
                <Input maxLength={10} name="name" placeholder="Example: Mani Codes" variant="subtle" autoComplete="off" />
              </Field>

              <Button mt={4} w={"100%"} type="submit">
                Play!
              </Button>
            </VStack>
          </form>
        </Box>
      </Center>
    </Box>
  );
}

export default Home;
