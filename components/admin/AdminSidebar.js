import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { FiMenu, FiLogOut, FiFolder } from "react-icons/fi";
import { RiDraftLine } from 'react-icons/ri';

const LinkItems = [
  { name: "Publish Post", icon: FiFolder, href: "/admin/publish" },
  { name: "Draft Post", icon: RiDraftLine, href: "/admin/draft" },
];

export default function AdminSidebar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [admin, setadmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token === undefined) {
      setadmin(false);
      router.push('/login')
    } else {
      axios
        .post("/api/auth/verify", { token })
        .then((response) => {
          setadmin(true);
        })
        .catch((err) => {
          console.log(err);
          router.push("/login");
        });
    }
    // eslint-disable-next-line
  },[] );
  const colormode = useColorModeValue;
  return (
    <>
    {
      admin && 
      (<>
      <Box minH="100vh" w="full" bg={()=>colormode("gray.50", "gray.900")}>
        <SidebarContent
          onClose={onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen}   />
        <Box  ml={{ base: 0, md: 60 }} p={8} >
          { props.children}
        </Box>
      </Box>
      </>)
    }
    </>
  )
}
const NavItem = (props) => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <Link
      href={props.href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <a>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg:'white',
            color: "cyan.400",
          }}
          color={pathname.includes(props.href) && 'white'}
          bgColor={pathname.includes(props.href) && 'cyan.400'}
          {...props}
        >
          {props.icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={props.icon}
            />
          )}
          {props.children}
        </Flex>
      </a>
    </Link>
  );
};
const SidebarContent = (props) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={props.onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} href={link.href} icon={link.icon || null}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const MobileNav = (props) => {
  const router = useRouter(); 
  const handleLogout = ()=>{
    Cookies.remove('userToken');
    router.push('/login');
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...props}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={props.onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="logout"
          icon={<FiLogOut />}
          onClick={handleLogout}
        />
      </HStack>
    </Flex>
  );
};
