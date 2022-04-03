import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  selectAuthor,
  selectAdded,
  addConversation,
} from "../../../redux/reducers/conversations";

import { ConversationType } from "../../../types/Conversation";
import { ALICE, BOB } from "../../../types/author";

function Form() {
  const dispatch = useAppDispatch();
  const author = useAppSelector(selectAuthor);
  const added = useAppSelector(selectAdded);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    setText("");
  }, [added]);

  const handleClick = () => {
    const conversation: ConversationType = {
      id: "",
      text: text,
      lastMutation: {
        type: "insert",
        index: 0,
        length: 0,
        text: "",
        author: author,
        origin: {
          alice: author === ALICE ? 1 : 0,
          bob: author === BOB ? 1 : 0,
        },
      },
    };

    dispatch(addConversation(conversation));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Chakra.Box h="15vh" px={8} py={2} ml={60}>
      <Chakra.Flex h="100%">
        <Chakra.Textarea
          h="100%"
          value={text}
          placeholder={"Hi " + author + ", Please typing..."}
          borderRadius="md"
          bg={Chakra.useColorModeValue("white", "gray.700")}
          onChange={handleChange}
        />
        <Chakra.Flex alignItems="center" h="100%" px={4}>
          <Chakra.IconButton
            aria-label=""
            colorScheme="green"
            icon={<IoIosSend />}
            onClick={handleClick}
          />
        </Chakra.Flex>
      </Chakra.Flex>
    </Chakra.Box>
  );
}

export default Form;
