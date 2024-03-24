/* eslint-disable react/jsx-key */
import fetch from "node-fetch";
import { createFrames, Button } from "frames.js/next";

// Airstack API configuration
const AIRSTACK_API_URL = "https://api.airstack.xyz/graphql";
const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;

// GraphQL Query
const query = `
query MyQuery {
  Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}
`;

// Main function
const main = async () => {
  try {
    if (!AIRSTACK_API_KEY) throw new Error("AIRSTACK_API_KEY not set");

    const res = await fetch(AIRSTACK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AIRSTACK_API_KEY,
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    const data = json.data;

    console.log(data);
  } catch (e) {
    throw new Error(e?.message);
  }
};

main();

const frames = createFrames({
  basePath: "/api/frames",
});

const callApi = async (fid) => {
  // Assuming this function fetches portfolio data based on the provided FID
  // Implement your API call logic here
  const response = await fetch(`YOUR_API_ENDPOINT/${fid}`);
  const data = await response.json();
  return data;
};

const handleRequest = frames(async (ctx) => {
  const type = ctx.searchParams.value || "home";

  if (type === "home") {
    return {
      image: (
        <div tw="flex flex-col justify-center items-center w-full h-full">
          <p tw="text-[40px]">Welcome to the FC Portfolio!</p>
          <p tw="">Click the button below to get started.</p>
        </div>
      ),
      buttons: [
        <Button action="post" target={{ query: { value: "start" } }}>
          Get Started
        </Button>,
      ],
    };
  } else if (type === "start") {
    return {
      image: (
        <div tw="flex flex-col justify-center items-center w-full h-full">
          <p tw="">Enter a FID to generate portfolio.</p>
        </div>
      ),
      buttons: [
        <Button action="post" target={{ query: { value: "portfolio" } }}>
          Generate Portfolio
        </Button>,
      ],
      textInput: "Enter FID",
      // take fid from here and query it using fetch from js according to givem query
    };
  } else if (type === "portfolio") {
    console.log("input text :", ctx.message.inputText);
    const fid = await callApi(ctx.message.inputText);
    console.log("fid :", fid);

    // Fetch portfolio data based on the input text (fid)
    const results = await callApi(fid);

    return {
      image: (
        <div tw="flex flex-col justify-center items-center w-full h-full">
          <p tw="text-[40px]">Here is your portfolio!</p>
          <p tw="">{JSON.stringify(results)}</p>
          <p tw="">{results}</p>
        </div>
      ),
      buttons: [
        <Button action="post" target={{ query: { value: "start" } }}>
          Generate another portfolio
        </Button>,
      ],
    };
  } else if (type === "error") {
    return {
      image: <span>There was an error</span>,
      buttons: [
        <Button action="post" target={{ query: { value: "home" } }}>
          Go to Home
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
