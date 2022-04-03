import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import * as ReactIcons from "react-icons/fi";

import { IconType } from "react-icons";
import NavItem from "./navitem";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface SidebarProps extends Chakra.BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Alice", icon: ReactIcons.FiUser },
  { name: "Bob", icon: ReactIcons.FiUser },
];

function SideBar({ onClose, ...rest }: SidebarProps) {
  return (
    <Chakra.Box
      bg={Chakra.useColorModeValue("white", "gray.700")}
      borderRight="1px"
      borderRightColor={Chakra.useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="90vh"
    >
      <Chakra.Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <Chakra.Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Ava Challenge
        </Chakra.Text>
        <Chakra.CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Chakra.Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Chakra.Box>
  );
}

export default SideBar;
