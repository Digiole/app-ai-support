import { checkLanguage, translateWhenNeeded } from "@/appConfig";

import { fetchWithTimeout } from "@/utils";

export const getData = async (entry, lastGoodAnswer, { scoreLimit, contentLng, sessionID }, indexOption, debugOption = false) => {
  let response;
  let result;
  if (debugOption) console.log("GET DATA ", scoreLimit, translateWhenNeeded, checkLanguage, contentLng, sessionID);

  try {
    //if (lastGoodAnswer.current !== "") {

    //const { checkLanguage, translateWhenNeeded, input, context, OPENAI_API_KEY, contentLng = "en", debug = true } = body;
    // requestBody supports OPENAI_API_KEY option too.. but then better create proxy api otherwise secret is visible...  
    const requestBody = { input: entry, translateWhenNeeded, checkLanguage, contentLng, context: lastGoodAnswer?.answer, debug: debugOption };
    response = await fetchWithTimeout(`${process.env.MIDDLEWARE_API_URL}detect`, {
      method: 'POST',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(requestBody)
    });

    //console.log("DETECT ", detectResponse);
    if (response.ok) {
      result = await response.json();
      console.log("DETECT RESULT ", result);
    }
  } catch (error) {
    console.log("detect ERROR ", error);
  }

  //const response = { AI: results[0], NER: { classification: nerClassification, filter, isoDate, timePeriod }, 
  //POS: results[2], entryType, detectedLng, newInput, tokens, latency: Math.ceil((new Date().getTime() - start) / 1000) };


  const { entryType, AI, NER, detectedLng } = result.response;

  let { newInput: searchEntry } = result.response;


  let { followUp, aggregate } = AI;

  let { filter } = NER;

  if (!followUp && lastGoodAnswer?.aggregate && entryType === -1) {
    followUp = true;
  }

  let followUpEntry = "";
  if (followUp && !aggregate && lastGoodAnswer?.answer !== undefined) {
    followUpEntry = lastGoodAnswer.answer;
  }
  if (followUp && aggregate && lastGoodAnswer?.question !== undefined) {
    // create new question.... 
    followUpEntry = lastGoodAnswer.statement;
  }

  if (followUpEntry !== "") {
    searchEntry += " " + followUpEntry;
  }

  let searchAggregation = aggregate;
  let sortResults = false;

  // without time period filter, it is not search aggregation... 
  if (filter?.["$and"] === undefined) {
    searchAggregation = false;
    filter = null;
  } else {
    //sortResults = true;
  }

  let requestResponse;
  try {
    const requestBody = { aggregate: searchAggregation, filter, docSource: "S3", session: sessionID, question: searchEntry, "topK": 10, scoreLimit: aggregate ? 0.1 : scoreLimit, "index-id": indexOption, "debug": debugOption };

    //  console.log(requestBody);
    //requestResponse = await fetch(`${process.env.MIDDLEWARE_API_URL}get-chunks`, requestOptions);
    requestResponse = await fetchWithTimeout(`${process.env.MIDDLEWARE_API_URL}get-chunks`, {
      method: 'POST',
      timeout: 15000,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!requestResponse.ok) {
      const err = Error(requestResponse.statusText, {
        cause: { code: requestResponse.status, info: await requestResponse.text() },
      });
      return { error: err }
    }
  } catch (error) {
    console.log("get chunks ERROR ", error);
  }

  // console.log("AI ", await requestResponse.json());
  const answer = await requestResponse.json();
  console.log("AI RESPONSE ", answer);

  let chunks = [];
  let scores = [];
  let functions = [];
  let tokens = 0;
  const sumOfScores = answer.result.reduce((total, item) => total + item.score, 0);
  scores = answer.result.map(m => m.score);
  const confidence = (sumOfScores / answer.result.length).toFixed(2);

  // this is when we need to find "latest"... 
  if (sortResults && answer.result.length > 0) {

    answer.result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // only include those results, which have same date as the first one... 
    const firstDate = answer.result[0].createdAt.split("T")[0];
    response.result = answer.result.filter(d => d.createdAt.split("T")[0] === firstDate);
    scores = answer.result.map(m => m.score);
  }
  if (answer.result.length > 0) {
    answer.result.forEach((r, i) => {
      if (r?.metadata?.tokens !== undefined) {
        tokens += r.metadata.tokens;
      }
      // if (r?.data !== undefined) {
      //   chunks.push(r);
      // }
      chunks.push(r);
      /*  if (!aggregate) {
         chunks.push(r);
       } else if (r?.data !== undefined) {
         chunks.push(r);
       } */

      if (r?.functions !== undefined) {
        let header = "";
        let data = [];
        if (r?.data !== undefined) {

          header = r.header.map(m => `"${m}"`).join(",");
          data = r.data;
        }

        functions.push({ ...r.functions, chunkIndex: i, aggregateData: { header, data } })
      }
    });
  }
  return { error: null, chunks, scores, functions, confidence, tokens, searchAggregation, followUp, entryType, newInput: searchEntry, langCode: detectedLng };
}


//what do you know about tero

// is there anything else