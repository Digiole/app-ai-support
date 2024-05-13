// fetchExample.js
import fetch from 'node-fetch';


async function exampleEndpoint() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/examples');
    if (!response.ok) { // Check if response is not okay
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}


async function generateEndpoint() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ""
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    // Process the text stream using Node.js streams
    response.body.on('data', chunk => {
      console.log(chunk.toString());
    });

    response.body.on('end', () => {
      console.log('Stream fully received');
    });
    /* 
  console.log("RESPONSE ", response.body);
  // Process the text stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(decoder.decode(value));
  }

  console.log('Stream fully received'); */
  } catch (error) {
    console.error('Error fetching the stream: ', error);
  }
}

async function main() {
  // await exampleEndpoint();
  await generateEndpoint();
}

main();