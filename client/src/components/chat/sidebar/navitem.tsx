import * as React from "react";
import * as Chakra from "@chakra-ui/react";

import { IconType } from "react-icons";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  updateAuthor,
  selectAuthor,
} from "../../../redux/reducers/conversations";

interface NavItemProps extends Chakra.FlexProps {
  icon: IconType;
  children: React.ReactText;
}

function NavItem({ icon, children, ...rest }: NavItemProps) {
  const dispatch = useAppDispatch();
  const author = useAppSelector(selectAuthor);
  const bgColor = Chakra.useColorModeValue("green.500", "cyan.400");
  const color = Chakra.useColorModeValue("black", "white");

  const handleChange = () => {
    dispatch(updateAuthor(children.toString()));
  };

  return (
    <Chakra.Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Chakra.Flex
        align="center"
        p="4"
        m="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={author === children.toString() ? bgColor : ""}
        color={author === children.toString() ? "white" : color}
        _hover={{
          bg: bgColor,
          color: "white",
        }}
        onClick={handleChange}
        {...rest}
      >
        {icon && (
          <Chakra.Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Chakra.Flex>
    </Chakra.Link>
  );
}

export default NavItem;
