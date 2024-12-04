import { DialogBody, DialogContent, DialogRoot } from "@/components/ui/dialog";
import { Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function BoomModal({
  opened,
  hittedBy,
}: Readonly<{ opened: boolean; hittedBy: string | null }>) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  return (
    <DialogRoot
      size="md"
      placement="center"
      motionPreset="slide-in-bottom"
      modal
      open={opened}
    >
      <DialogContent zIndex={isFullScreen ? 9999 : undefined}>
        <DialogBody>
          <Center h="100%">
            <Heading>You were hitted by {hittedBy}</Heading>
          </Center>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
