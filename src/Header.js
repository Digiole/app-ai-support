import React, { useState } from 'react';

import { Box, Button, Flex, Spacer, Link, IconButton, Text, HStack, Wrap, WrapItem } from '@chakra-ui/react'

import { InfoIcon, HamburgerIcon } from '@chakra-ui/icons'

import styled from "@emotion/styled";
import Image from "next/legacy/image";

//import { Image as SVGImageElement } from '@chakra-ui/next-js'

import { headerOptions, StyledImg } from "@/appConfig";

// let StyledImg;

// if (headerOptions.logo.type === 'SVG') {

//   StyledImg = styled(SVGImageElement)`

//   width:180px;
//   cursor:pointer;
//   `;
// } else {
//   StyledImg = styled(Box)`
// height:${headerOptions.height};

// /* width:180px; */
// cursor:pointer;
// /* 
// svg {
//   width:213px;
//   @media (max-width: 768px) {
//    width:170px;
//   }  
//  }  */
// `;
// }

//position: ${props => props.ismobile === "true" ? "sticky" : "fixed"};
const StyledHeader = styled(Box)`
/* padding-left:80px; */
/* position:fixed; */
/*
position: ${props => props.ismobile === "true" ? "sticky" : "fixed"};
x:0;
y:0;
top:0;
*/
height:115px;
background-color:${headerOptions.backgroundColor};
/* background-color:#2C5282; */
/*
background-color:rgba(255,255,255,1)
*/
/* width:100%; */
`;
const StyledButton = styled(Button)`
@media (max-width: 768px) {
  white-space: revert;
    padding: 20px;
}  
`;

const Header = ({ onClose, onOpen, isOpen, isMobile, ...props }) => {
  //onClose={onClose} isOpen={isOpen} onClick={onOpen}
  const [imageLoaded, setImageLoaded] = useState(false);
  // console.log("HEADER ", headerOptions)

  return <>

    <StyledHeader pl={[0, 5, 5, 5]} {...props} ismobile={isMobile.toString()}>
      <HStack h={"100%"} alignItems={"center"} >
        {!isOpen &&
          <IconButton variant={"ghost"} icon={<HamburgerIcon boxSize={"1.7em"} onClick={onOpen} />} />
        }
        <Wrap w={"100%"}>
          <WrapItem w={headerOptions.logo.width} style={{ position: "relative", overflow: 'hidden' }}>

            {headerOptions.logo.show && headerOptions.logo.type !== 'SVG' &&
              <StyledImg onClick={() => {
                window.open(headerOptions.logo.url, '_blank');
              }} >

                <Image priority={false} alt="header" src={headerOptions.logo.image} layout='fill' objectPosition='left' objectFit='contain' onLoadingComplete={() => setImageLoaded(true)}
                  style={{
                    transition: 'visibility 0.3s linear',
                    visibility: imageLoaded ? 'visible' : 'hidden',
                  }} />
              </StyledImg>
            }

            {headerOptions.logo.show && headerOptions.logo.type === 'SVG' &&
              <StyledImg alt="header" onClick={() => {
                window.open(headerOptions.logo.url, '_blank');
              }} >

              </StyledImg>
            }

            {/* 
              <img alt="header" src={headerOptions.logo.image} height={"105px"} style={{ height: '105px' }} />
             <Image priority={false} alt="header" src={headerOptions.logo.image} width={"328"} height={67} />
            <StyledImg onClick={() => {
              window.open("https://www.ecosystemos.com", '_blank');
            }} >
              <StyledSvg />
            </StyledImg> */}
          </WrapItem>
          {headerOptions.middle.show &&
            <WrapItem w={[170, 220]} justifyContent={"left"} alignItems={"center"}>
              <Text fontSize={["16px", "24px"]} as={"span"} lineHeight={"36px"} color={headerOptions.middle.color}>{headerOptions.middle.text}</Text>
            </WrapItem>
          }
        </Wrap>
        <Spacer />
        {headerOptions.link.show &&
          <Link pr={[4, 4, 5, 5]} href={headerOptions.link.url} isExternal color={headerOptions.link.color}><InfoIcon /></Link>
        }
        {headerOptions.booking.show &&
          <StyledButton size={["xs", "sm", "md"]} mr={[2, 2, 10, 10]} colorScheme='whatsapp' onClick={() => {
            window.open(headerOptions.booking.url, '_blank');

          }}>{headerOptions.booking.text}</StyledButton>
        }
      </HStack>
    </StyledHeader>
  </>
}

export default Header;