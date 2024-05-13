// pages/[username].js
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useReducer, useCallback } from 'react';

import {
  Flex, Grid, GridItem, useToast, Alert, AlertIcon, Center, VStack, Text, AbsoluteCenter, useOutsideClick, useMediaQuery, useDisclosure, Textarea, Avatar, ChakraProvider, Card, CardBody, HStack, Box, IconButton
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'

import MobileSideBar from "@/MobileSideBar";
import Sidebar from "@/SideBar";
import { theme, EVALS, showFeedback, domain } from "@/appConfig";
import { fetchWithTimeout, generateUniqueId } from "@/utils";
import Header from "@/Header2";
import Footer from "@/Footer";
import Welcome from "@/Welcome";
import { AppContext } from "@/contexLib";
import autosize from 'autosize';

//import { v4 as uuidv4 } from 'uuid';
import { newExample } from "@/utils/getExample";

import FeedBack from "./components/index";

import { ChakraAvatar } from "./components/index";

import { useVectorStore } from "@/store/zustand";

import { useShallow } from 'zustand/react/shallow'

import { parseQuestion, getData } from "@/utils/getChunks";
import { aiAnswer, scoreInfo, updateUsedTokens, getHistory } from "@/utils/getAnswer";

import { __ } from "@/utils/lng";
import useStore from "@/store/helper";

import Head from 'next/head';

function UserPage() {

  const router = useRouter();
  const { username } = router.query;
  //console.log("USER ", username);
  const [haveAnswer, setHaveAnswer] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 768px)');


  const scrollSpan = useRef();
  const scrollSpan2 = useRef();
  const sideBar = useRef();
  const statement = useRef();

  //const queryActive = useRef(false);
  const knowledgebase = useRef({});
  //const requestId = useRef();

  const uniqueId = useRef();
  //const exampleStatement = useRef("Hello")
  // const summary = useRef("");
  const haveChunks = useRef(false);
  const [messageList, setMessageList] = useState([]);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      errors: false,
      loading: true,
      isUpdated: true,

    }
  );

  const { currentUser, setCurrentUser, requestId, setRequestId, url, sessionID, language,
    scoreLimit, example, setExample, isFooterRendered, setIsFooterRendered, queryActive,
    setQueryActive, summary, setSummary, lastGoodAnswer, setLastGoodAnswer,
    models, defaultModel, currentTopic, setCurrentTopic } = useStore(
      useShallow((state) => ({
        currentUser: state.currentUser,
        requestId: state.requestId,
        url: state.url,
        language: state.language,
        example: state.example,
        scoreLimit: state.scoreLimit,
        sessionID: state.sessionID,
        isFooterRendered: state.isFooterRendered,
        queryActive: state.queryActive,
        // haveChunks: state.haveChunks,
        summary: state.summary,
        lastGoodAnswer: state.lastGoodAnswer,
        models: state.models,
        defaultModel: state.defaultModel,
        currentTopic: state.currentTopic,
        setCurrentTopic: state.setCurrentTopic,
        setLastGoodAnswer: state.setLastGoodAnswer,
        setSummary: state.setSummary,
        //setHaveChunks: state.setHaveChunks,
        setQueryActive: state.setQueryActive,
        setIsFooterRendered: state.setIsFooterRendered,
        setRequestId: state.setRequestId,
        setCurrentUser: state.setCurrentUser,
        setSessionID: state.setSessionID,
        setExample: state.setExample,
      }))
    );

  //const language = useRef(EVALS.contentLng);

  //const scoreLimit = useRef(EVALS.defaultScoreLimit);

  //const currentUser = useRef(null);
  //const lastGoodAnswer = useRef({});
  const functionContent = useRef();

  //const currentTopic = useRef('topic-0');
  const topicList = useRef([currentTopic]);
  const messages = useRef([])

  //gpt-3.5-turbo-0125
  //const models = useRef({ 'gpt-3.5-turbo': 3000, 'gpt-3.5-turbo-1106': 15000 });
  //const defaultModel = useRef('gpt-3.5-turbo-1106');

  const toast = useToast();

  const { getLastItem, getItems, insert, semanticSearch } = useVectorStore(
    useShallow((state) => ({ getLastItem: state.getLastItem, getItems: state.getItems, insert: state.insert, semanticSearch: state.semanticSearch })),
  );

  const handleSidebarEvents = (opt) => {
    console.log("SIDEBAR EVENTS ", opt);

  };
  const providerValue = {
    sideBarEvents: handleSidebarEvents
  };

  useOutsideClick({
    ref: sideBar,
    handler: () => {
      if (sideBar.current !== null && sideBar.current !== undefined) {
        onClose();
      }
    }
  });


  useEffect(() => {
    if (haveAnswer) {
      statement.current.style.height = `${EVALS.defaultHeight}px`;

      scrollSpan.current.scrollIntoView(true, { behavior: "auto", block: "end", inline: "nearest" });

      statement.current.disabled = false;
      statement.current.dataset.status = "ready";
      statement.current.focus();
    }
  }, [haveAnswer]);

  useEffect(() => {

    const handleOrientationChange = () => {
      // Handle orientation change here
      console.log("DEVICE TURNED ");
      setTimeout(() => {
        console.log("SCROLL REF ", scrollSpan2.current)
        if (scrollSpan2.current) {
          scrollSpan2.current.scrollIntoView(true, { behavior: "auto", block: "end", inline: "nearest" });
        }


        if (scrollSpan2.current === null && scrollSpan.current) {
          scrollSpan.current.scrollIntoView(true, { behavior: "auto", block: "end", inline: "nearest" });
        }

      }, 300);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {

      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);


  const handleFeedbackClick = useCallback(async (e) => {
    console.log('Feedback Clicked! ', e, sessionID);
    //console.log(e.target.parentNode);
    /*  let dataset = undefined;
     if (e.target.parentNode instanceof SVGElement) {
       //console.log('Parent node is SVG');
       // for some reason chakra iconbutton attributes are set in svg element path ?
       dataset = e.target.parentNode.parentNode.dataset;
     } else {
       // console.log('Parent node is not SVG');
       dataset = e.target.dataset;
     }
     dataset.active = true;
     console.log(dataset);
     const { id, element } = dataset;
     let thumbColor = "";
     //const feedbackElement = document.getElementById(`feedback-${id}`);
     // const { score } = feedbackElement.dataset;
     const feedback = {
       "app_id": process.env.NEXT_PUBLIC_APP_ID, "session_id": sessionID,
       "indexId": currentIndex.current,
       thread: messages.current, "label": "", "comment": ""
     }
     if (element === "thumbs-down") {
       feedback.label = "neg";
       thumbColor = "red";
     }
     if (element === "thumbs-up") {
       feedback.label = "pos";
       thumbColor = "green";
     }
     if (element === "comment") {
       const comment = document.getElementById(`comment-text-${id}`).value;
       feedback.comment = comment;
     }
 
     if (feedback.label === "" && feedback.comment === "") return Promise.resolve(true);
 
     await fetchWithTimeout(`${process.env.MIDDLEWARE_API_URL}feedback`, {
       method: 'POST',
       timeout: 5000,
       headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
       },
 
       body: JSON.stringify(feedback)
     });
     const commentVisible = document.getElementById(`comment-${id}`);
     if (commentVisible) {
       commentVisible.style.display = "none";
     }
     if (thumbColor !== "") {
       document.querySelector(`[data-id="${id}"][data-element="${element}"]`).style.color = thumbColor;
     }
  */
  }, [sessionID]);


  useEffect(() => {

    async function init() {
      if (username) {
        sessionStorage.setItem('lastVisitedSlug', username);

        const requestResponse = await fetchWithTimeout(`${url}/navigate`, {
          method: 'POST',
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },

          body: JSON.stringify({
            currentUrl: window.location.href,
          })
        });

        if (!requestResponse.ok) {
          const error = await requestResponse.text()
          console.log("ERROR ", error);
          setState({ errors: true });

          return;
        }

        // const web = requestResponse.body;
        // result = await detectResponse.json();
        const initData = await requestResponse.json();
        knowledgebase.current = initData.result;
        //currentUser.current = initData.result.name;
        setCurrentUser(initData.result.name);
        // console.log("KNOWLEDGEBASE ", Object.keys(knowledgebase.current));
        const { error, data } = await newExample(fetchWithTimeout, sessionID, knowledgebase.current.knowledgebaseId, language);
        console.log("EXAMPLE ", data, error)
        if (error) {
          toast({ title: error.message || error.name, status: "error" });
          return;
        }

        console.log("SUMMARY ")
        //exampleStatement.current = data.response.question;
        setExample({ question: data.response.question, "show": true })
        //summary.current = data.response.summary;
        let summary = `${data.response.summary}
        Question: How was this AI created, and how can I get my own?
        Answer: This personalized AI is accessible through the website https://${domain}, where individuals can explore the possibilities of creating their own AI twin. This platform is designed to make the process user-friendly and accessible, allowing speakers from various fields to have an AI counterpart for broader interaction and communication purposes. Whether for personal use, business applications, or direct-to-consumer services, hi.speak-to.ai provides the tools and guidance needed to create an AI twin tailored to your specific needs and objectives.`;

        if (knowledgebase.current.description && knowledgebase.current.description.length > 0) {
          summary = `${summary}
          Description of the speaker: ${knowledgebase.current.description}`;
        }

        setSummary(summary);


        setState({ loading: false });
        //setUserData({ name: username })

      }
    }
    init();

    autosize(statement.current);
  }, [username, toast, sessionID, url, setCurrentUser, language, setExample, setSummary]);


  useEffect(() => {
    /*  const getFunctionAnswer = async () => {
 
       const chatId = uniqueId.current;
 
       scrollSpan.current.scrollIntoView(true, { behavior: "auto", block: "end", inline: "nearest" });
 
       setHaveAnswer(true);
       queryActive.current = false;
 
     } */
    const getAnswer = async (chunks, scores, followUp, aggregate, newInput, entryType, langCode, tokens, contentInput = "") => {
      let entry = statement.current.value.trim();
      if (entry === "") {
        return
      }
      if (entryType === 1 && !entry.endsWith('?')) {
        entry += '?'
      }
      if (entryType === -1 && !entry.endsWith('.') && !entry.endsWith('!')) {
        entry += '.'
      }
      const chatId = uniqueId.current;
      let followUpUpdate = followUp;
      // history content.... 
      //const lastEntry = getLastItem();
      //const lastEntry = lastGoodAnswer.current;
      const lastEntry = lastGoodAnswer;
      const queryResult = await semanticSearch({ text: entry, score: 0.3, topK: 5 });
      console.log("QUERY RESULT ", queryResult);
      let historyContent = [];
      if (queryResult.length > 0) {
        const sessionItems = getItems();

        //currentTopic.current = queryResult[0].item.metadata.topic;
        setCurrentTopic(queryResult[0].item.metadata.topic);
        const maxTokens = models[defaultModel];
        if (tokens < (maxTokens - 2000)) {
          historyContent = getHistory(tokens, maxTokens - 1000, queryResult, sessionItems, currentTopic);
        }

      } else {
        const topic = `topic-${topicList.current.length}`;
        topicList.current.push(topic);
        //currentTopic.current = topic;
        setCurrentTopic(topic);
        if (!lastGoodAnswer.followUp) {
          followUpUpdate = false;
        }
      }


      const results = await aiAnswer({
        url,
        requestId,
        lastEntry, aggregate, followUp: followUpUpdate, statement: entry, llm: defaultModel,
        history: historyContent, chunks, summary, chatId, knowledgebaseId: knowledgebase.current.knowledgebaseId,
        session: sessionID,
        entryType, langCode,
        appId: process.env.APP_ID,
        userId: currentUser
        //userId: currentUser.current

      });

      if (results?.error) {

        toast({ title: results.error.message || results.error.name, status: "error", description: results.error.cause.info });
        const msgIndex = messageList.length - 1;

        const updatedMessageList = [...messageList];
        updatedMessageList[msgIndex][1].streaming = false;
        setHaveAnswer(true);
        //queryActive.current = false;
        setQueryActive(false);
        statement.current.value = "";
        return;

      }

      console.log("GET ANSWER END RESULTS  ", results);
      const msgIndex = messageList.length - 1;

      const updatedMessageList = [...messageList];
      updatedMessageList[msgIndex][1].answer = results.answer;
      updatedMessageList[msgIndex][1].streaming = false;
      // answer has html tags like this <br/>
      const cleanedAnswer = results.answer.replace(/<br\/>/g, '\n').replace(/<\/?[^>]+(>|$)/g, " ").trim()

      const avgScore = (scores.reduce((total, score) => total + score, 0) / scores.length) || 0;
      const formattedScore = avgScore > 0 ? avgScore.toFixed(2) : avgScore;

      messages.current.push({ answer: cleanedAnswer, statement: entry, "score": formattedScore });

      if (avgScore >= (scoreLimit + 0.1)) { //0.3
        //lastGoodAnswer.current = { answer: cleanedAnswer, aggregate, statement: entry, followUp: followUpUpdate, entryType }
        setLastGoodAnswer({ answer: cleanedAnswer, aggregate, statement: entry, followUp: followUpUpdate, entryType })
      } else {
        // lastGoodAnswer.current = {};
        setLastGoodAnswer({});
      }
      if (contentInput !== "") {
        updatedMessageList[msgIndex][1].details = __(`This answer bypasses default content, instead new @get content and history was used.`, language);
        updatedMessageList[msgIndex][1].info = __('info-color', language);
      } else {
        const { details, info } = scoreInfo(avgScore, scoreLimit);
        updatedMessageList[msgIndex][1].details = __(details, language);
        updatedMessageList[msgIndex][1].info = __(info, language);
      }

      setMessageList(updatedMessageList);

      updateUsedTokens({ url, userId: currentUser, requestId, finish_reason: results.finish_reason, currentIndex: knowledgebase.current.knowledgebaseId, llm: defaultModel, statement: entry, session: sessionID, answer: results.answer, score: avgScore, tokens: results.tokens }).then(updateRes => {
        //console.log("UPDATE USED TOKENS IN VECTOR ", updateRes);
        //console.log("UPDATE USED TOKENS IN VECTOR ", updateRes.response);
        console.log("UPDATE USED TOKENS IN VECTOR ", updateRes.response.tokens);


        // add Q/A into vector
        insert({ text: `${entry} ${cleanedAnswer}`, metadata: { entry, answer: cleanedAnswer, tokens: updateRes.response.tokens, topic: currentTopic } });

      });

      // update logger final used tokens
      // const { session, question, messages: tokenMessages, llm, answer, score, tokens } = req.body;
      setHaveAnswer(true);
      //queryActive.current = false;
      setQueryActive(false);
      statement.current.value = "";

    }
    const getChunks = async (entry) => {
      console.log("GET CHUNKS ", sessionID, entry);
      console.log(messageList);
      if (entry.startsWith("@get")) {
        let parts = entry.split(" ");
        if (!parts[1].startsWith("http")) {
          parts[1] = 'https://' + parts[1];
        }
        const requestOptions = {
          method: 'POST',
          timeout: 27000,  // 28s is amplify timeout
          headers: new Headers({ 'Cache-Control': 'no-cache', 'Content-Type': 'application/json', Accept: 'application/json' }),
          body: JSON.stringify({ url: parts[1], summaryRequired: parts.length < 3 })
        };
        console.log("GET URL  REQUEST ", requestOptions);

        //  const requestResponse = await fetch(`${url}/get-url`, requestOptions);
        const requestResponse = await fetchWithTimeout(`${process.env.MIDDLEWARE_API_URL}get-url`, requestOptions);

        if (!requestResponse.ok) {
          console.log("ERROR ", await requestResponse.text());
          // const err = Error(requestResponse.statusText, {
          //   cause: { code: requestResponse.status, info: await requestResponse.text() },
          // });
          // return { error: err } 
        }

        // const web = requestResponse.body;
        // result = await detectResponse.json();
        const web = await requestResponse.json();

        console.log("WEB ", web);

        // console.log("WEB ", web.response.urlContent.text);
        //  new TextEncoder().encode(JSON.stringify).length;

        const metadata = { "source": "web", title: web.response.urlContent.title, description: web.response.urlContent.description, keywords: web.response.urlContent.keywords };

        //const text = longText;
        const webSummary = web.response.summaryContent.summary || ""
        const latency = web.response.latency;

        let splitTopic = parts[1]; //"web topic";

        // api response limit is 4MB === 4194304B
        // Convert bytes to MB
        //const sizeInMB = sizeInBytes / (1024 * 1024);
        // seems 500 vectors is good max limit.... one vector is 8052B
        const docParts = sliceIntoChunks(web.response.urlContent.chunks, 500);
        // console.log("DOC ", docParts);
        let totalLength = 0;
        for (let i = 0; i < docParts.length; i++) {
          const chunk = docParts[i].map(txt => {
            const trimmedTxt = txt.trim();
            totalLength += trimmedTxt.length;
            const tokens = tokenEstimate(trimmedTxt);
            return { text: trimmedTxt, metadata: { entry: trimmedTxt, answer: "", tokens, topic: splitTopic, ...metadata } };
          });
          await insert(chunk);

        }

        const chatId = uniqueId.current;

        const msgIndex = messageList.length - 1;
        const updatedMessageList = [...messageList];
        updatedMessageList[msgIndex][0].details = __(`In total ${totalLength} characters. Fetched in ${latency} secs.`, language);

        updatedMessageList[msgIndex][1].answer = webSummary;
        updatedMessageList[msgIndex][1].details = __(`This is summary of the ${parts[1]}.`, language);
        updatedMessageList[msgIndex][1].info = __('info-color', language);

        if (webSummary !== "") {
          document.getElementById(chatId).querySelector('.dots').style.display = "none";
          updatedMessageList[msgIndex][1].streaming = false;
          setHaveAnswer(true);
          setQueryActive(false);
          //queryActive.current = false;
          statement.current.value = "";
        } else {
          const contentInput = parts.slice(2).join(" ")
          //getAnswer(chunks, scores, followUpUpdate, searchAggregation, newQuestion, entryType, langCode, tokens);
          getAnswer([], [], false, false, "", undefined, "en", 0, contentInput);
        }

        return;

      }

      const { error: dataError, chunks, scores, functions, confidence, tokens, searchAggregation, followUp, entryType, langCode, newInput } = await getData(entry, lastGoodAnswer, { sessionID, scoreLimit, contentLng: EVALS.contentLng }, knowledgebase.current.knowledgebaseId, true);

      if (dataError) {

        toast({ title: dataError.message || dataError.name, status: "error", description: dataError.cause.info });

        const msgIndex = messageList.length - 1;
        const updatedMessageList = [...messageList];
        updatedMessageList[msgIndex][1].streaming = false;
        setHaveAnswer(true);
        setQueryActive(false);
        //queryActive.current = false;
        statement.current.value = "";
        return;
      }


      console.log("FINAL CHUNKS ", chunks, confidence);

      const msgIndex = messageList.length - 1;
      const updatedMessageList = [...messageList];
      if (chunks.length > 0) {
        //updatedMessageList[msgIndex][0].details = `${chunks.length} chunks were found. Average confidence is ${confidence}.`;
        updatedMessageList[msgIndex][0].details = __("{{chunks}} chunks were found. Average confidence is {{confidence}}", language, { chunks: chunks.length, confidence });
      } else {
        updatedMessageList[msgIndex][0].details = __("Nothing was found", language);
      }

      setMessageList(updatedMessageList);

      //setHaveChunks(true);
      haveChunks.current = true;
      functionContent.current = null;
      // disable functions for now...
      getAnswer(chunks, scores, followUp, searchAggregation, newInput, entryType, langCode, tokens);

    }

    if (document.getElementById(uniqueId.current) !== null && statement.current.value.trim() !== "") {

      setHaveAnswer(false);

      scrollSpan.current.scrollIntoView(true, { behavior: "auto", block: "end", inline: "nearest" });

      if (!haveChunks.current) {
        getChunks(statement.current.value.trim());
      }

    }

  }, [messageList, sessionID, semanticSearch, insert, getItems, getLastItem, toast, currentUser, requestId, url, scoreLimit, language, setQueryActive, summary, lastGoodAnswer, setLastGoodAnswer, models, defaultModel, currentTopic, setCurrentTopic]);

  const newMessage = (e) => {
    e.preventDefault();
    console.log("NEW MSG", statement.current.value, queryActive);
    if (!queryActive) {
      //requestId.current = uuidv4();
      setRequestId();
      statement.current.disabled = true;

      statement.current.dataset.status = "processing";
      uniqueId.current = generateUniqueId();

      const userChat = { value: statement.current.value, uniqueId: uniqueId.current, details: "" };
      const aiChat = { uniqueId: uniqueId.current, answer: "", streaming: true };

      setState({
        isUpdated: false
      });

      setQueryActive(true);
      //setHaveChunks(false);
      haveChunks.current = false;
      setMessageList([...messageList, [userChat, aiChat, uniqueId.current]]);

    }
  }


  if (state.loading && !state.errors) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider theme={theme}>
      {knowledgebase.current.title &&
        <Head>

          <title>{knowledgebase.current.title}</title>
          <meta name="description" content={knowledgebase.current.description} />
          <meta property="og:site_name" content="Get AI Support" />
          <meta property="og:title" content={knowledgebase.current.title} />
          <meta property="og:description" content={knowledgebase.current.description}></meta>
          <meta property="og:image" content="/ai-support.png" />

        </Head>}
      {!state.errors &&
        <HStack gap={"0px"}>
          {/* 
          {isOpen && <>
            <AppContext.Provider value={providerValue}>
              {!isMobile && <Box ref={sideBar} w={EVALS.sideBarWidth} className="sidebar" >
                <Box mb={"20px"} pl={[0, 5, 5, 5]}>
                  <IconButton icon={<HamburgerIcon boxSize={"1.7em"} onClick={onClose} />} />
                </Box>
                <Sidebar onClose={onClose} />

              </Box>}
              {isMobile && <MobileSideBar onClose={onClose} isOpen={isOpen} />}
            </AppContext.Provider>
          </>
          } */}
          <Grid
            templateAreas={`"header"
                  "main"
                  "footer"`}
            gridTemplateRows={'auto 1fr auto'}
            gridTemplateColumns={'1fr'}
            h='100dvh'
            w={'100%'}
            gap='1'
            color='blackAlpha.700'
          >

            <GridItem area={'header'}>
              {/*   <Header isMobile={isMobile} onClose={onClose} isOpen={isOpen} onOpen={onOpen} /> */}
              <Header isMobile={isMobile} onClose={onClose} onOpen={onOpen} />
            </GridItem>
            <GridItem area={'main'} className="content" ml={[0, 5]}>
              <div className="messages">
                {messageList.map((message, key) => {
                  return (

                    <div key={"chats-" + key} >
                      <div className="messageContainer" key={"chat-" + key} >

                        <Card key={"question-" + key} mr={[0, 5]} ><CardBody className="question user"><HStack spacing={"10px"}>
                          <Box><Avatar size={isMobile ? "sm" : "md"} /></Box>
                          <Box>
                            <Box className="message user-question" id={`user-${message[0].uniqueId}`}>{message[0].value}
                              {message[0].details !== "" &&
                                <Box className="details details-text">
                                  {message[0].details}
                                </Box>
                              }
                            </Box>
                          </Box>

                        </HStack></CardBody></Card>
                        <Card key={"answer-" + key} mr={[0, 5]}><CardBody className="answer ai">
                          <HStack alignItems={"normal"}>
                            <Box >
                              <ChakraAvatar img={knowledgebase.current.avatar} />
                            </Box>
                            <Box w={"100%"}>
                              <Box className="message" id={message[1].uniqueId}>
                                {message[1].streaming &&
                                  <Box className="dots" />
                                }
                                {message[1].streaming &&
                                  <Box className="question-answer" />
                                }

                                {!message[1].streaming && <>
                                  <Box className="question-answer">
                                    <span dangerouslySetInnerHTML={{ __html: message[1].answer }}></span>
                                  </Box>
                                  {message[1]?.component !== undefined && <>
                                    <Box>
                                      {message[1].component}
                                    </Box>
                                  </>}
                                  {showFeedback && <>
                                    <FeedBack lang={language} id={message[1].uniqueId} FeedBackClick={handleFeedbackClick} details={message[1].details} info={message[1].info} />
                                  </>}
                                </>
                                }
                              </Box>
                            </Box>
                            {/* 
                          <Box w={"100%"}>{message[1]}</Box>
                          */}
                          </HStack>
                        </CardBody></Card>

                      </div>

                    </div>
                  );
                })}

                <div style={{ height: "10px", width: "100%", marginBottom: "25px" }} ref={scrollSpan} id={"scroll-marker"} />

              </div>
              {(state.isUpdated && example.show && isFooterRendered) && <>
                <Welcome data={knowledgebase.current} onClick={(e) => {
                  //console.log("CLICK");
                  statement.current.value = example.question;
                  const event = new KeyboardEvent('keydown', {
                    key: 'Enter', // Specify the key value
                    code: 'Enter', // Specify the code value
                    keyCode: 13, // Specify the keyCode for Enter
                    which: 13, // Deprecated, but included for compatibility with older browsers
                    bubbles: true, // Event should bubble up through the DOM
                    cancelable: true, // Event can be canceled
                  });

                  // Dispatch the event to the target element
                  statement.current.dispatchEvent(event);
                  e.preventDefault();
                }} exampleText={example.question} />
                <div style={{ height: "10px", width: "100%" }} ref={scrollSpan2} id={"scroll-marker2"} />
              </>
              }
            </GridItem>
            <GridItem area={'footer'}>
              {knowledgebase.current['test-mode'] &&
                <Center>
                  <Box p={5} w={"50%"}>
                    <Alert status='warning' >
                      <AlertIcon />
                      This is now in test mode.
                    </Alert>
                  </Box>
                </Center>
              }
              <Footer ref={statement} newMessage={newMessage} onMounted={() => {
                setIsFooterRendered(true);
              }} />
            </GridItem>
          </Grid>

        </HStack>
      }
      {state.errors && <>
        <Alert status='error'>
          Invalid username
        </Alert>

      </>}
    </ChakraProvider>
  );
}

export default UserPage;
