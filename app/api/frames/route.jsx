/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { getFarcasterUserDetails, init } from "@airstack/frames";

init(process.AIRSTACK_API_KEY);

const frames = createFrames({
  basePath: "/api/frames",
});

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
    };
  } else if (type === "portfolio") {
    //API call for portfolio details
    console.log("input text :", ctx.message.inputText);
    const fidInput = await callApi(ctx.message.inputText);
    console.log("fid :", fidInput);
    const input = {
      fid: fidInput,
    };
    const { data, error } = await getFarcasterUserDetails(input);

    if (error) throw new error();

    console.log(data);

    return {
      image: (
        <div tw="flex flex-col justify-center items-center w-full h-full">
          <p tw="text-[40px]">Here is your portfolio!</p>
          <p tw="">{JSON.stringify(data)}</p>
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
