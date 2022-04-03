import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import {
  deleteConversation,
  selectAuthor,
  mutation,
  selectUpdated,
} from "../../../../redux/reducers/conversations";
import { ALICE, BOB } from "../../../../types/author";
import { MutationType } from "../../../../types/mutation";

export type CardType = {
  author: string;
  text: string;
  date: number;
};

const ALICE_AVATAR = "https://avatars0.githubusercontent.com/u/1164541?v=3";
const BOB_ABATAR =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ";

function Card({ author, text, date }: CardType) {
  const d = new Date(date);
  const dispatch = useAppDispatch();
  const editor = useAppSelector(selectAuthor);
  const updated = useAppSelector(selectUpdated);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isChanged, setIsChanged] = React.useState(false);
  const [mutationText, setMutationText] = React.useState(text);
  const [selectionStart, setSelectionStart] = React.useState(0);
  const [selectionEnd, setSelectionEnd] = React.useState(0);
  const editTextArea = React.useRef<HTMLTextAreaElement>(null);

  const handleDelete = async () => {
    await dispatch(deleteConversation(date.toString()));
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  const handleEditChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMutationText(e.target.value);
      if (e.target.value !== text) {
        setIsChanged(true);

        if (editTextArea.current) {
          if (selectionStart === 0)
            setSelectionStart(editTextArea.current.selectionStart);
          setSelectionEnd(editTextArea.current.selectionStart);
        }
      } else {
        setIsChanged(false);
        setSelectionStart(0);
        setSelectionEnd(0);
      }
    },
    [selectionStart, text]
  );

  const handleMutation = async () => {
    const conversation: MutationType = {
      conversationId: date.toString(),
      text: mutationText,
      author: editor,
      origin: {
        alice: editor === ALICE ? 1 : 0,
        bob: editor === BOB ? 1 : 0,
      },
      data: {
        type: text.length < mutationText.length ? "insert" : "delete",
        index:
          text.length < mutationText.length ? selectionStart : selectionEnd + 1,
        length: Math.abs(selectionEnd - selectionStart) + 1,
        text:
          text.length < mutationText.length
            ? mutationText.slice(selectionStart - 1, selectionEnd)
            : text.slice(selectionEnd, selectionStart + 1),
      },
    };

    await dispatch(mutation(conversation));

    if (updated) {
      console.log(updated);
      setIsEdit(false);
      setIsChanged(false);
      setSelectionStart(0);
      setSelectionEnd(0);
    }
  };

  return (
    <Chakra.Stack
      w="50%"
      p="4"
      boxShadow="lg"
      m="4"
      borderRadius="sm"
      bg={Chakra.useColorModeValue("white", "gray.700")}
    >
      <Chakra.Stack direction="row" alignItems="center">
        <Chakra.Text fontWeight="semibold">{author}</Chakra.Text>
      </Chakra.Stack>

      <Chakra.Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        {isEdit ? (
          <Chakra.Textarea
            ref={editTextArea}
            variant="flushed"
            value={mutationText}
            onChange={handleEditChange}
          ></Chakra.Textarea>
        ) : (
          <Chakra.Text
            fontSize={{ base: "sm" }}
            textAlign={"left"}
            maxW={"4xl"}
          >
            {text}
          </Chakra.Text>
        )}
      </Chakra.Stack>
      <Chakra.Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Chakra.Avatar src={author === "Alice" ? ALICE_AVATAR : BOB_ABATAR} />
        <Chakra.Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Chakra.Text fontWeight={600}>{author}</Chakra.Text>
          <Chakra.Text color={"gray.500"}>
            {d.toLocaleDateString() +
              " " +
              d.getHours() +
              ":" +
              d.getMinutes() +
              ":" +
              d.getSeconds()}
          </Chakra.Text>
        </Chakra.Stack>
        <Chakra.Spacer />
        <Chakra.Stack direction={{ base: "column", md: "row" }}>
          {!isEdit ? (
            <Chakra.IconButton
              aria-label=""
              size="sm"
              colorScheme="green"
              icon={<EditIcon />}
              onClick={handleEdit}
            />
          ) : isChanged ? (
            <Chakra.IconButton
              aria-label=""
              size="sm"
              colorScheme="green"
              icon={<CheckIcon />}
              onClick={handleMutation}
            />
          ) : (
            <Chakra.IconButton
              aria-label=""
              size="sm"
              colorScheme="green"
              icon={<CloseIcon />}
              onClick={handleClose}
            />
          )}
          <Chakra.IconButton
            aria-label=""
            size="sm"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={handleDelete}
          />
        </Chakra.Stack>
      </Chakra.Stack>
    </Chakra.Stack>
  );
}

export default Card;
