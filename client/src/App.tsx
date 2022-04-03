import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import Chat from "./components/chat";

import { useAppDispatch } from "./redux/hook";
import { getConversations } from "./redux/reducers/conversations";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <ColorModeSwitcher />
        <Box width="960px" mx="auto">
          <Chat />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
