
import { fetchWithTimeout } from "@/utils";


function customDeserialize(str) {
  console.log("DESERIALIZE ", str);
  const obj = {};
  str.split(';').forEach(pair => {
    const [key, value] = pair.split('=');
    try {
      // Decode each part safely
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    } catch (e) {
      console.error("Failed to decode URI component", e);
      // Handle or log the error, or assign a default value
      obj[key] = value; // Optionally keep the original undecoded value
    }
  });
  return obj;
}

/* 
function customDeserialize(str) {
  console.log("DESERIALIZE ", str);
  //text=%20around;finish_reason=null
  const obj = {};
  str.split(';').forEach(pair => {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    obj[key] = value;
  });
  return obj;
} */

const getStreamAnswer = async (data, chatId, update = false) => {

  //console.log("STREAM ", data);
  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  if (!update) {
    document.getElementById(chatId).querySelector('.dots').style.display = "none";
  }
  const element = document.getElementById(chatId).querySelector('.question-answer');
  if (update) {
    element.innerHTML += " ";
  }

  let answer = "";
  let finish_reason = null;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    //console.log("STREAM VALUE ", decoder.decode(value));
    /*
   STREAM VALUE  text=-;finish_reason=null
text=%20Outdoor;finish_reason=null
text=%20activities;finish_reason=null
    */

    let chunkValue = decoder.decode(value);
    if (value !== "") {
      const chunks = chunkValue.split('\n');
      if (chunks.length > 0) {
        //console.log("CHUNKS ", chunks);

        const deserialized = chunks.filter(c => c !== "").map(chunk => JSON.stringify(customDeserialize(chunk))).map(str => JSON.parse(str));
        //console.log(deserialized, deserialized.length);
        if (deserialized.length > 0) {
          chunkValue = "";
          deserialized.forEach(c => {
            finish_reason = c.finish_reason;
            chunkValue += c.text;
          })
        }


      }
      // finish_reason = chunk.finish_reason;
      // streamValue = chunk.text;
    }

    //const chunkValue = decoder.decode(streamValue);
    const text = chunkValue.replaceAll("\n", "<br/>");
    //console.log("TEXT ", text);
    element.innerHTML += text;

    const scrollHere = document.getElementById("scroll-marker");
    scrollHere.scrollIntoView(true, { behavior: "smooth", block: "end", inline: "nearest" });
    answer += text;
  }

  console.log("STREAM RESPONSE ", answer, finish_reason);
  return Promise.resolve({ answer, finish_reason });
}


export const getHistory = (tokens, maxTokens, queryResult, allItems, currentTopic) => {
  const history = [];

  //historyContent.push({ role: "user", content: lastItem.metadata.entry });
  //historyContent.push({ role: "assistant", content: lastItem.metadata.answer });

  let addedTokens = 0;
  let itemIndex = [];
  // first include all which match well with the entry... 
  const sourceContent = [];
  for (let h = 0; h < queryResult.length; h++) {
    const item = queryResult[h].item;
    if ((tokens + addedTokens + item.metadata.tokens) < maxTokens) {
      itemIndex.push(item.metadata.index);
      addedTokens += item.metadata.tokens;
      //history.push(item.text);
      if (item.metadata?.source === undefined) {
        if (item.metadata.entry !== "") {
          history.push({ role: "user", content: item.metadata.entry });
        }
        if (item.metadata.answer !== "") {
          history.push({ role: "assistant", content: item.metadata.answer });
        }
      } else {
        sourceContent.push(item.metadata);
      }
    }
  }
  // console.log("SOURCE ", JSON.stringify(sourceContent, true, 1));
  if (sourceContent.length > 0) {
    const topics = {};
    sourceContent.forEach(meta => {
      if (!topics[meta.source]) {
        topics[meta.source] = {};
      }
      if (!topics[meta.source][meta.topic]) {
        topics[meta.source][meta.topic] = [];
      }
      topics[meta.source][meta.topic].push(meta);
    });
    //console.log("TOPICS ", JSON.stringify(topics, true, 1));
    Object.keys(topics).forEach(source => {
      Object.keys(topics[source]).forEach(topic => {
        //console.log("SOURCE ", topic, source);
        if (source === "web") {
          const page = [];

          if (topics[source][topic][0]?.keywords !== undefined) page.push(`Page keywords are: ${topics[source][topic][0].keywords}.`);
          if (topics[source][topic][0]?.description !== undefined) page.push(`Page description is: ${topics[source][topic][0].description}.`);
          if (topics[source][topic][0]?.title !== undefined) page.push(`Page title is: ${topics[source][topic][0].title}.`);

          topics[source][topic].forEach(item => {
            page.push(item.entry);
          });
          history.push({ role: "user", content: page.join(" ") });
        }
      });
    });

  }
  /* 
  // include also all same topic... and set the default topic to the best match...
  if ((tokens + addedTokens) < maxTokens) {

    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      if ((tokens + addedTokens + item.metadata.tokens) < maxTokens) {
        if (item.metadata.topic === currentTopic && itemIndex.findIndex(h => h === item.metadata.index) < 0) {
          addedTokens += item.metadata.tokens;
          itemIndex.push(item.metadata.index);
          //history.push(item.text);
          if (item.metadata.entry !== "") {
            history.push({ role: "user", content: item.metadata.entry });
          }
          history.push({ role: "assistant", content: item.metadata.answer });
        }
      }
    }
  }
 */

  console.log("HISTORY ", history);

  return history;
}

export const updateUsedTokens = async ({ url, ...opts }) => {

  // proxy api, which outputs info to app logs. 
  const tokens = await fetch(`${url}/updateUsedTokens`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    body: JSON.stringify(opts),
  });

  let tokendata = {};
  if (tokens.ok) {
    tokendata = await tokens.json();
  }

  return Promise.resolve(tokendata);
}

export const scoreInfo = (avgScore, scoreLimit) => {

  let update = {};
  if (avgScore < (scoreLimit + 0.3)) {
    if (avgScore === 0) {
      update.details = "There are no results that match your search criteria. Please try different keywords or broadening your search."
      update.info = 'alert-color'
    }

    if (avgScore > 0 && avgScore < (scoreLimit + 0.1)) { //0.3
      update.details = "More details could help improve the answer. Please provide additional context or clarification."
      update.info = 'warning-color';
    }
    if (avgScore > 0 && avgScore >= (scoreLimit + 0.1)) { //0.3
      update.details = "The answer can be improved by adding more details to the question."
      update.info = 'info-color';
    }
  } else {

    update.details = "Your query provided good results from the available content."
    update.info = 'good-color';

  }
  return update;
}

const makeRequest = async (requestOptions, url) => {

  let requestResponse = undefined;
  try {
    //requestResponse = await fetchWithTimeout(`${url}/generate`, requestOptions);
    requestResponse = await fetchWithTimeout(`${process.env.MIDDLEWARE_API_URL}generate`, requestOptions);
  } catch (err) {
    console.log("OPENAI ERROR ", err);
    console.error(err);
    let error;
    let errorName = err.name;
    if (err.name === "AbortError") {
      errorName = "OPENAI Timeout"
      error = Error(errorName, {
        name: errorName,
        cause: { code: 500, info: err },
      });
    } else {

      const requestErr = await requestResponse.text()
      error = Error(requestResponse.statusText, {
        cause: { code: requestResponse.status, info: requestErr },
      });
    }

    return { error };
  }
  if (!requestResponse.ok) {
    console.log("ERROR ", requestResponse);
    //console.log("ERROR ", await requestResponse.text());

    const error = Error(requestResponse.statusText, {
      cause: { code: requestResponse.status, info: await requestResponse.json() },
    });

    return { error }
  }

  const data = requestResponse.body;
  //console.log("NEW REQ DATA ", data);
  //const sentMessages = JSON.parse(decodeURIComponent(requestResponse.headers.get('X-Custom-Messages')));
  //console.log("HEADER ", requestResponse.headers);
  //console.log("HEADER ", requestResponse.headers.get('X-Custom-Messages'));
  // console.log("CUSTOM HEADER ", sentMessages);
  //return { error: null, data, sentMessages };
  return { error: null, data };
  //return null;

}

export const aiAnswer = async ({ url, entryType, langCode, ...opts }) => {

  // requestBody supports OPENAI_API_KEY option too.. but then better create proxy api otherwise secret is visible...  

  const requestOptions = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    body: JSON.stringify(opts),
    timeout: 27000  // 28s is amplify timeout

  };

  console.log("AI ANSWER REQUEST ", requestOptions, url);
  /* 

  let requestResponse = undefined;
  try {
    requestResponse = await fetchWithTimeout(`${process.env.MIDDLEWARE_API_URL}generate`, requestOptions);
  } catch (err) {
    console.log("OPENAI ERROR ", err);
    console.error(err);
    let error;
    let errorName = err.name;
    if (err.name === "AbortError") {
      errorName = "OPENAI Timeout"
      error = Error(errorName, {
        name: errorName,
        cause: { code: 500, info: err },
      });
    } else {
      const requestErr = await requestResponse.text()
      error = Error(requestResponse.statusText, {
        cause: { code: requestResponse.status, info: requestErr },
      });
    }

    return { error };
  }
  if (!requestResponse.ok) {
    console.log("ERROR ", requestResponse);
    //console.log("ERROR ", await requestResponse.text());

    const error = Error(requestResponse.statusText, {
      cause: { code: requestResponse.status, info: await requestResponse.json() },
    });

    return { error }
  }

  const data = requestResponse.body;
  const sentMessages = JSON.parse(decodeURIComponent(requestResponse.headers.get('X-Custom-Messages'))); */

  const { error, data } = await makeRequest(requestOptions, url);
  if (error) {
    return error;
  }

  //console.log("HEADERS ", sentMessages);
  if (!data) {
    return;
  }


  const tokens = updateUsedTokens({ url, userId: opts.userId, requestId: opts.requestId, followUp: opts.followUp, aggregate: opts.aggregate, entryType, langCode, currentIndex: opts.knowledgebaseId, llm: opts.llm, statement: opts.statement, session: opts.session });


  //const tokens = await fetch(`${url}/getTokens`, tokenRequestOptions);

  // const { answer, finish_reason } = getStreamAnswer(data, opts.chatId);
  const streamResults = getStreamAnswer(data, opts.chatId);

  const results = await Promise.all([tokens, streamResults]);

  // normal finish reason is "stop"
  // length: Incomplete model output due to max_tokens parameter or token limit
  // function_call: The model decided to call a function
  // content_filter: Omitted content due to a flag from our content filters
  // null: API response still in progress or incomplete.  This should not happen here as getStreamAnswer also updates the UI... 

  console.log("ANSWER RESULTS", results);
  // console.log("HISTORY ", sentMessages);
  let finalAnswer = results[1].answer;
  let finishReason = results[1]?.finish_reason;
  /*
  if (finishReason !== undefined && finishReason === 'length') {
    // loop continue until finish-reason is not "length" anymore... 
    //console.log("CONTINUE LOOP ", sentMessages);
    //statement: entry
    //opts.statement = 'next part';
    opts.history = sentMessages;
    if (opts.history[0].role === "system") {
      opts.history[0].content += "\n- Continue incomplete answer.";
    }
    opts.history.push({ "role": "assistant", "content": finalAnswer });
    opts.chunks = [];
    opts.continueNext = true;
    requestOptions.body = JSON.stringify(opts);
    //console.log("REQ OPTS ", requestOptions);
    let cnt = 0;
    do {
      const { error, data, sentMessages: history } = await makeRequest(requestOptions);
      if (error) {
        return error;
      }
      const streamResults = await getStreamAnswer(data, opts.chatId, true);
      console.log("LOOP RESULTS ", streamResults);

      opts.history = history;
      opts.history.push({ "role": "assistant", "content": streamResults.answer });
      requestOptions.body = JSON.stringify(opts);

      finalAnswer += " " + streamResults.answer;

      finishReason = streamResults.finish_reason;
      // so that we don't get infinite loop... 
      cnt++;
    } while (finishReason === "length" && cnt < 2)


  }
*/
  return { error: null, answer: finalAnswer, tokens: results[0].response.tokens, finish_reason: finishReason };

}
