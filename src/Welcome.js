import { useState } from 'react';

import {
  VStack, Text, Card, CardBody, Box,
} from '@chakra-ui/react'

import Image from "next/legacy/image";
function capitalizeNames(inputString) {
  // Step 1: Convert the entire string to lowercase
  inputString = inputString.toLowerCase();

  // Step 2: Split the string into words
  let words = inputString.split(' ');

  // Step 3: Capitalize the first letter of each word
  let capitalizedWords = words.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Step 4: Join the words back together
  return capitalizedWords.join(' ');
}

const WelcomeContainer = ({ data, exampleText, ...props }) => {

  const [imageLoaded, setImageLoaded] = useState(false);
  return <>
    <Box className="welcomeContainer" key={"init-2"} pl={"10px"} >

      <Box pt={"10px"} pb={"32px"}>
        <VStack align={"center"}>


          <Box h="200px" position="relative" width="100%" overflow="hidden">
            <div style={{ height: "100%", width: "100%", position: "relative" }}>
              <Image
                src={data.avatar}
                alt="header"
                layout='fill'
                objectFit="contain"
                onLoadingComplete={() => setImageLoaded(true)}
                style={{
                  visibility: imageLoaded ? 'visible' : 'hidden',
                }}
              />
            </div>
          </Box>
          <Text as='b'>{data.title}</Text>
          <Text >{data.title2 || ""}</Text>
          {/* 
          <Text as='b'>{"Hi. I'm Oscar from Digiole."}</Text>
          <Text >{`I can assist with topics related to startup team building.
How can I help you?`}</Text> */}
          <Text mt={"20"}>Try click this example question.</Text>

          <Card w="80%" >
            <CardBody  >
              <Text className={"example"} textAlign={"center"} {...props}>{exampleText}</Text>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </Box>
  </>
}

export default WelcomeContainer;