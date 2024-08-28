import React, { forwardRef, useEffect, useRef, useState } from "react";

import {
  Flex, Textarea, HStack, IconButton, Center, VStack, Spacer 
} from '@chakra-ui/react'

import SendDisabled from '@/assets/Status_Disabled_Icon_Send.svg';
import SendDefault  from '@/assets/Status_Default_Icon_Send.svg';
import SendHover  from '@/assets/Status_Hover_Icon_Send.svg';
import SendClick  from '@/assets/Status_Clicking_Icon_Send.svg';
import Image from 'next/image';

import { FiSend } from "react-icons/fi";
import { EVALS, themeColor } from "@/appConfig";

import autosize from "autosize";

function useMergedRefs(...refs) {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (node) => {
      refs.forEach((ref) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      });
    };
  }, [refs]);
}

const Footer = forwardRef(({ newMessage, onMounted }, ref) => {

  const internalRef = useRef(null);
  const mergedRef = useMergedRefs(internalRef, ref);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const getButtonIcon = () => {
    if (textareaValue === '') {
      return SendDisabled;
    } else if (isClicked) {
      return SendClick;
    } else if (isHovered) {
      return SendHover;
    } else {
      return SendDefault;
    }
  }

  useEffect(() => {
    if (onMounted) {
      onMounted();
    }
  }, [onMounted]);
  useEffect(() => {
    if (internalRef.current) {
      autosize(internalRef.current);
    }
  }, []);
  return (

    <Flex
    as="footer"
    bg="#FAFAFB"
    direction="column"
    align="center"
    justify={["flex-start", "flex-end"]}
    minHeight={["auto", "130px"]}
    width="100%"
    position="relative"
    bottom="0"
    left="0"
    px={[4, 8]}
    pb={[4, 0]} 
    overflow="hidden" 
    maxWidth="100vw"
  >
      <VStack w="100%" spacing={4}>
        {/* <HStack style={{ border: "none", borderLeft: "1px solid", borderTop: "1px solid", borderBottom: "1px solid", borderColor: `${themeColor}`, borderRadius: "8px" }}> */}
        <HStack width={["100%", "894px"]}>
          <Flex className="messageInputs" width="100%">

            <Textarea w={"100%"} data-status="ready" data-testid="statement" ref={mergedRef} resize={"none"} maxHeight={"250px"} minHeight={`${EVALS.defaultHeight}px`} h={`${EVALS.defaultHeight}px`}
            onKeyDown={e => {
              setTextareaValue(e.target.value);
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                console.log("keydown... ", e.key, e.shiftKey);
                setTextareaValue('');
                console.log(ref.current.value);
                if (ref?.current.value !== "") {
                  newMessage(e);
                }
              }
              }}
              maxLength={600} 
              placeholder="Type your question here ..."
            />
            <Flex width="18px"></Flex>
            <Flex alignItems={"center"} justifyContent={"center"} className="btn" id="send-question" onClick={(e) => {
              e.preventDefault();

              if (ref?.current.value !== "") {
                setTextareaValue(''); 
                setIsHovered(false);
                setIsClicked(false);
                newMessage(e);
              }
            }}>
              <IconButton variant={"customIconButton"} style={{ borderRadius: "1em" }} icon={<Image
                  src={getButtonIcon()}
                  alt="send-icon"
                />} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setIsClicked(false);
                }}
                onMouseDown={() => setIsClicked(true)}
                onMouseUp={() => {
                  setIsClicked(false);
                }}
                isDisabled={textareaValue === ''}/>
            {/*   <StyledSendSvg /> */}
            </Flex>
          </Flex>
          
        </HStack>
        <Flex 
          textColor="#C0C6C7"  
          width="100%" 
          justifyContent="center" 
          pb={[4, 0]} 
          display={{ base: 'none', md: 'flex' }}
          >
            Powered by Digiole
          </Flex>
      </VStack>
    </Flex>
  );
});

Footer.displayName = "Footer";

export default Footer;