
import {
  Icon, Avatar, Wrap, WrapItem, HStack, Text, VStack, IconButton, Flex, Box, Textarea, Button, Card, CardBody, Image
} from '@chakra-ui/react'

import styled from "@emotion/styled";
import send from "@/assets/send.svg"

import { FaExclamationCircle, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { wisdomImage, showFeedback, themeColor } from "@/appConfig";
import { __ } from "@/utils/lng";
//import { Image } from '@chakra-ui/next-js';
import NextImage from 'next/image'
//import Image from "next/image";
export const StyledSendSvg = styled(send)`
/*  */
 transform: rotate(-30deg);
  width: 40px;
  cursor: pointer;
  top: -4px;
  position: relative;
/*   background-color: ${themeColor}; */
  @media (max-width: 768px) {
    width: 30px;
  }
}
`;

const StyledWisdom = styled(wisdomImage.image)`
 /* 
 width:48px;
height:48px;
*/
/* object-fit:cover; */
`;


const SplitDiv = styled(Box)`
 /* display: flex; */
  border-top: 1px solid gray;
  width:100%;
  padding-top:2px;
  li {
    width:49%;

  @media (max-width: 768px) {
    width: 100%;
  }
  }

`;
const LeftSide = styled(Box)`
  /* flex: 1;
  display: flex; */
  align-items: center; 
 /*  margin-left:20px; */
 /*  width:50%; */
`;

const RightSide = styled(Box)`
  /* flex: 1;
  display: flex; */
  justify-content: flex-end;
  /* gap: 10px; // add gap */
 /*  margin-right: 20px; */
  width:100%;
`;

const TextWithIcon = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem; 
  }
`;

const CommentButton = styled(Button)`
  // styles  
`;

export const ChakraAvatar = ({ img }) => {


  //return <div className="profile"><Avatar width={"48px"} height={"48px"} src={img} /> </div>;
  return <div className="profile"><Image src={img} borderRadius='full'
    boxSize='48px' alt={"avatar"} /> </div>;
}


const FeedBack = ({ id, FeedBackClick, details, info, lang }) => {
  //const commentID = generateUniqueId();
  //const comments = useRef();
  //console.log("FEEDBACK ", id, FeedBackClick, details, info);

  return <SplitDiv id={`feedback-${id}`} className={"feedbacks"} >
    <Wrap>

      <WrapItem>
        <LeftSide>
          <TextWithIcon>
            <FaExclamationCircle className={`details-icon ${info}`} style={{ "minWidth": "14px" }} />
            <span className={"details-text"}>{details} </span>
          </TextWithIcon>
        </LeftSide>
      </WrapItem>

      {showFeedback &&
        <WrapItem>
          <RightSide>
            <HStack gap={"2px"} className={"feedback-text"} alignItems={"center"}>
              <Text>{__("Feedback:", lang)}</Text>
              {/* <VStack alignItems={"end"}> */}
              <CommentButton data-testid="comment" variant='ghost' onClick={(e) => {
                // e.target.closest(".feedback-text").style.alignItems = "flex-start";
                const comment = document.getElementById(`comment-${id}`);
                if (comment.style.display === 'none') {
                  comment.style.display = "block";
                } else {
                  comment.style.display = "none";
                }

                const scrollHere = document.getElementById("scroll-marker");
                scrollHere.scrollIntoView(true, { behavior: "smooth", block: "end", inline: "nearest" });

              }}>{__("Add comment", lang)}</CommentButton>

              {/*   </VStack> */}
              <Flex h={"100%"}>
                <IconButton variant='ghost' data-id={id} data-element={'thumbs-down'} onClick={FeedBackClick} icon={<FaThumbsDown />} />
                <IconButton variant='ghost' data-id={id} data-element={'thumbs-up'} onClick={FeedBackClick} icon={<FaThumbsUp />} />
              </Flex>
            </HStack>
            <Box w={["90%", "100%"]} id={`comment-${id}`} style={{ display: "none" }}>
              <VStack justifyContent={"space-between"} alignContent={"end"}>
                <Textarea id={`comment-text-${id}`} placeholder={__("Enter comment here", lang)} />
                <Button data-id={id} data-element={'comment'} onClick={FeedBackClick}>{__("Send", lang)}</Button>
              </VStack>
            </Box>
          </RightSide>
        </WrapItem>
      }
    </Wrap>
  </SplitDiv>

}


export const Examples = ({ lng, texts, onClick }) => {
  console.log("LANG ", lng);
  return <>
    <Box className="exampleContainer" key={"init-2"} pl={"10px"}>
      <Box pt={"50px"} >
        <Text as='b' fontSize='xl'>{__("Example question", lng)}</Text>
      </Box>
      <Box pt={"10px"} pb={"32px"}>
        <VStack spacing={"32px"} align='stretch' >

          <Card style={{ cursor: "pointer" }} >
            <CardBody>
              <Text className={"example"} onClick={onClick} >{texts}</Text>
            </CardBody>
          </Card>

        </VStack>
      </Box>
    </Box>
  </>
}


export default FeedBack;