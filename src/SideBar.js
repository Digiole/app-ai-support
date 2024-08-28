import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Switch, 
  useColorMode, 
  useOutsideClick 
} from '@chakra-ui/react'


import {
  /* FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar, 
  FiMenu, */
  FiSettings,
} from 'react-icons/fi'

//import styled from "@emotion/styled";

import Image from "next/legacy/image";

import { headerOptions } from "@/appConfig";


import Settings from "@/Settings";
/* 
import HeaderImage from "./assets/wisdom.svg";
const StyledSvg = styled(HeaderImage)`
path {
fill: #2C5282;
}
width:180px;
`; */
const LinkItems = [
  /*  { name: 'Home', icon: FiHome },
   { name: 'Trending', icon: FiTrendingUp },
   { name: 'Explore', icon: FiCompass },
   { name: 'Favourites', icon: FiStar }, */
  { name: 'About', icon: null, component: <Settings /> },
  { name: 'Personalization', icon: null, component: <Settings /> },
  { name: 'Disclaimer', icon: null, component: <Settings /> },
  { name: 'Term of use', icon: null, component: <Settings /> },
  { name: 'Privacy Policy', icon: null, component: <Settings /> },
  // { name: 'Dark mode', icon: null, component: <Settings /> },
]

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={(e) => e.stopPropagation()}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}


export default function SideBar({ mobile = false, onClose, ...rest }) {

  //console.log("CLOSE ", onClose);
  const [show, setShow] = useState(false);

  const selectedComponent = useRef(null);
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const sideBarRef = useRef(null);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }

  }, [onClose]);

  useOutsideClick({
    ref: sideBarRef,
    handler: (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        onClose();
      }
    },
  });

  return (
    <Box
      pt={[0, 10]}
      /* 
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')} */

      {...rest}>
      {mobile &&
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          {/* 
          <img alt="header" src={"./assets/JClogo2023.png"} width={"75%"} /> */}
          <Image priority={false} alt="header" src={headerOptions.logo.image} width={0} height={0} sizes={"100vw"} style={{ "width": "75%" }} />
          {/*  <StyledSvg /> */}
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
      }
      {!show && <>
        {
          LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} onClick={() => {
              //console.log("SIDEBAR CLICK ");
              e.stopPropagation();
              selectedComponent.current = link.component;
              setShow(true);
            }}>
              {link.name}
            </NavItem>
          ))
        }
        <Box
          style={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 'none' }} 
        >
          <HStack>
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer" 
              onClick={(e) => {
                e.stopPropagation(); 
              }}
            >
              Dark mode
            </Flex>
            <Flex onClick={(e) => {
              e.stopPropagation();  
            }}>
              <Switch id="darkModeSwitch" isChecked={colorMode === 'dark'} 
              onChange={(e) => {
                e.stopPropagation(); 
                toggleColorMode();
              }}/>
            </Flex>
          </HStack>
        </Box>
      </>
      }
      {show && <>
        {selectedComponent.current}
      </>}

    </Box>
  )
}
