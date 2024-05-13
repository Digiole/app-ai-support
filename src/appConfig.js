
import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';
import { Raleway } from 'next/font/google';

//import wisdomAvatar from "@/assets/wisdom-avatar.svg";

import wisdomAvatar from "@/assets/wisdom-avatar.svg";

import WisdomImage from "./assets/wisdom.svg";

import styled from "@emotion/styled";

//const HeaderImage = styled(WisdomImage)`
const HeaderImage = styled.div`
position: relative;
    width:215px; 
   height:111px;
  cursor:pointer;
     `;

export const StyledImg = (props) => {
  // return <Img alt="header" src={'/assets/wisdom.svg'} />
  return <HeaderImage alt="header" {...props} />
};
//import wisdomAvatar from "@/assets/app-avatar.png";

//console.log("IMAGE ", wisdomAvatar);
/* 
src
: 
"/_next/static/media/app-avatar.e5cb755c.png" */
//prifina...
//export const themeColor = "#107569";

export const themeColor = "#000000";
//export const themeColor = "#2C5282";



const nextFont = Raleway({
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
});

const customIconButton = defineStyle({
  background: `${themeColor}`,
  color: 'white',

  // let's also provide dark mode alternatives
  _hover: {
    background: 'blue.200'
  }
})

const buttonTheme = defineStyleConfig({
  variants: { customIconButton },
})
/* 
const theme = extendTheme({
  components: { Button: buttonTheme },
})
 */

export const theme = extendTheme({
  // Set the fonts like this
  fonts: {
    body: nextFont.style.fontFamily,
    heading: nextFont.style.fontFamily,
  },
  components: { Button: buttonTheme },
});

export const checkLanguage = false;
export const showExamples = false;
export const translateWhenNeeded = false;
export const showFeedback = false;

export const wisdomImage = { image: wisdomAvatar, url: "/assets/app-avatar.png" };

//export const wisdomImage = { image: wisdomAvatar };

//import headerImage from "./assets/wisdom.svg";

export const domain = "www.getai.support"
export const headerOptions = {
  height: '105px',
  //backgroundColor: "rgba(255,255,255,1)",
  backgroundColor: themeColor,
  logo: {
    show: true,
    url: `https://${domain}/`,

    type: "PNG",
    width: '200px',
    image: `/assets/logo.png`,

  },
  middle: {
    show: false,
    color: themeColor,
    //color: 'white',
    text: "- Expert"
  },
  link: {
    show: true,
    color: themeColor,
    //color: 'white',
    url: `https://${domain}/`
  },
  booking: {
    show: false,
    url: `https://${domain}/`,
    text: "BOOK A MEETING"
  }
}

export const EVALS = {
  contentLng: process.env.NEXT_PUBLIC_CONTENT_LANGUAGE,
  defaultScoreLimit: 0.20,
  appStorage: "getAISupport",
  //initBottomContainerHeight: 174,
  defaultHeight: 50,
  minScoreValue: 0.20,
  maxScoreValue: 0.50,
  sideBarWidth: 200,
  autoCompletion: false
}

export const uploadOptions = {
  contentLng: false,
  translationLng: false,
  metaTags: false,
  subscriptionPlans: false,
}

export const main = {
  title: "Get AI Support - Your Digital AI Twin",
  description: "An AI assistant that support, engages, and learns from your audience in real-time."
}