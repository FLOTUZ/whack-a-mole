import {
  DialogBody,
  DialogContent,
  DialogRoot,
} from "@/components/ui/dialog";
import { Center, Heading } from "@chakra-ui/react";

export default function BoomModal({
  opened,
  hittedBy,
}: Readonly<{ opened: boolean; hittedBy: string | null }>) {
  return (
    <DialogRoot
      size="md"
      placement="center"
      motionPreset="slide-in-bottom"
      modal
      open={opened}
    >
      <DialogContent>
        <DialogBody>
          <Center h="100%">
            <Heading>You were hitted by {hittedBy}</Heading>
          </Center>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
