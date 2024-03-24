/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/api/frames",
});

const handleRequest = frames(async (ctx) => {
  const type = ctx.searchParams.value || "home";
  if (type === "home") {
    return {
      image: (
        <span>Welcome to FC Portfolio. Enter FID to generate portfolio</span>
      ),
      textInput: "Enter FID",
      buttons: [
        <Button action="post" target={{ query: { value: "userDetails" } }}>
          Submit FID
        </Button>,
      ],
    };
  } else if (type === "userDetails") {
    return {
      image: <span>User Details</span>,
      buttons: [
        <Button action="post" target={{ query: { value: "portfolio" } }}>
          Generate Portfolio
        </Button>,
      ],
    };
  } else type === "portfolio";
  return {
    image: <span>Personal portfolio details</span>,
    buttons: [
      <Button action="post" target={{ query: { value: "home" } }}>
        Go to Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
