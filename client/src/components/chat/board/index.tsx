import * as React from "react";
import * as Chakra from "@chakra-ui/react";

import { useAppSelector } from "../../../redux/hook";
import {
  selectAuthor,
  selectConversaions,
} from "../../../redux/reducers/conversations";

import Card from "./card";

function Board() {
  const author = useAppSelector(selectAuthor);
  const conversations = useAppSelector(selectConversaions);

  return (
    <Chakra.Flex width="100%" direction="column">
      {conversations?.map((conversation, index) => {
        return conversation.lastMutation.author.toLocaleLowerCase() ===
          author.toLocaleLowerCase() ? (
          <Chakra.Flex key={index}>
            <Card
              author={conversation.lastMutation.author}
              text={conversation.text}
              date={Number(conversation.id)}
            />
            <Chakra.Spacer />
          </Chakra.Flex>
        ) : (
          <Chakra.Flex key={index}>
            <Chakra.Spacer />
            <Card
              author={conversation.lastMutation.author}
              text={conversation.text}
              date={Number(conversation.id)}
            />
          </Chakra.Flex>
        );
      })}
    </Chakra.Flex>
  );
}

export default Board;
