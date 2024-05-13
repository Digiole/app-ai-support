import { EVALS } from "@/appConfig";

export const newExample = async (fetchWithTimeout, sessionID, knowledgebaseId, lang) => {

  let exampleResponse;
  let error = null;
  let result;
  try {
    // requestBody supports OPENAI_API_KEY option too.. but then better create proxy api otherwise secret is visible...  
    const requestBody = { sessionID, knowledgebaseId, sourceLng: EVALS.contentLng, targetLng: lang }
    exampleResponse = await fetchWithTimeout(`${process.env.MIDDLEWARE_API_URL}examples`, {
      method: 'POST',
      timeout: 25000,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },

      body: JSON.stringify(requestBody)
    });

    console.log("EXAMPLE", exampleResponse);
    if (exampleResponse.ok) {
      result = await exampleResponse.json();
      //  console.log("EXAMPLE RES", result);
    } else {
      const err = await exampleResponse.text();
      console.error("RESPONSE ERROR ", err);
      error = Error(exampleResponse.statusText, {
        cause: { code: exampleResponse.status, info: err },
      });
    }

  } catch (err) {

    console.error(err);
    let errorName = err.name;
    if (err.name === "AbortError") {
      errorName = "OPENAI Timeout"
      error = Error(errorName, {
        name: err.name,
        cause: { code: 500, info: err },
      });
    }
  }
  // console.log("EXAMPLE RES END ", result);
  return { error, data: result };
}

