import React from "react";

import {
  Box,
  useColorModeValue,

  Drawer,
  DrawerContent,
} from '@chakra-ui/react'

import SideBar from "./SideBar2";

export default function MobileSideBar({ isOpen, onClose }) {
  //const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100dvh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {/* <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} /> */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        /*   onOverlayClick={onClose} */
        size="full">
        <DrawerContent>
          <SideBar
            mobile={true}
            pos="fixed"
            w={{ base: 'full', md: 60 }} h="full" onClose={onClose} />
        </DrawerContent>
      </Drawer>


    </Box>
  )
}
