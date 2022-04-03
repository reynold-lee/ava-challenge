import * as React from "react";
import * as Chakra from "@chakra-ui/react";

import Board from "./board";
import Form from "./form";
import SideBar from "./sidebar";

import { useAppSelector } from "../../redux/hook";
import { selectAdded } from "../../redux/reducers/conversations";

function Chat() {
  const added = useAppSelector(selectAdded);
  const { isOpen, onClose } = Chakra.useDisclosure();
  const chatBox = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (added) {
      if (chatBox.current) {
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
      }
    }
  }, [added]);

  return (
    <Chakra.Box>
      <Chakra.Box
        h="75vh"
        bg={Chakra.useColorModeValue("gray.100", "gray.900")}
      >
        <SideBar
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Chakra.Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <Chakra.DrawerContent>
            <SideBar onClose={onClose} />
          </Chakra.DrawerContent>
        </Chakra.Drawer>
        <Chakra.Box
          ref={chatBox}
          display="flex"
          h="100%"
          overflow="auto"
          ml={{ base: 0, md: 60 }}
          p="4"
        >
          <Board />
        </Chakra.Box>
      </Chakra.Box>

      <Form />
    </Chakra.Box>
  );
}

export default Chat;
