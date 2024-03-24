/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/api/frames",
});

const handleRequest = frames(async (ctx) => {
  const type = ctx.searchParams.value || "home";
  console.log(process.env.AIRSTACK_API_KEY);
  if (type === "home") {
    return {
      accepts: [
        {
          id: "farcaster",
          version: "vNext",
        },
        {
          id: "xmtp",
          version: "vNext",
        },
      ],
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
      accepts: [
        {
          id: "farcaster",
          version: "vNext",
        },
        {
          id: "xmtp",
          version: "vNext",
        },
      ],
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

    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNGE0YTU2Mi02ZjIzLTQxNzItYjJiOS05NjgyMjEzNDNkOGMiLCJlbWFpbCI6Inlhc2hhc3ZpY2hhdWRoYXJ5MTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjEzOTAwZmRjNGZjMWU0YTk1NjY3Iiwic2NvcGVkS2V5U2VjcmV0IjoiYmVmNDkxOWMzYTJjOGRjMzUxYTkyMzMyOWE0NTFjZDMwMjY0YjY4MDNkY2Q5NTQ2ZmQ2NWM1OTA3YzVlNDFlOSIsImlhdCI6MTcxMTI4ODkyMH0.-7BFynMehlFaSc8GA4RQz213eRiICe0ZwCC73CCWjTg",
      },
    };

    let portfolioData;
    await fetch(
      `https://api.pinata.cloud/v3/farcaster/users/${ctx.message.inputText}`,
      options
    )
      .then((response) => response.json())
      .then((response) => (portfolioData = response.data))
      .catch((err) => console.error(err));

    console.log(portfolioData);

    function calculateReputationScore(followers, following) {
      const followerWeight = 0.7;
      const followingWeight = 0.3;
      const normalizedFollowers = followers / 1000;
      const normalizedFollowing = following / 1000;
      const reputationScore =
        normalizedFollowers * followerWeight +
        normalizedFollowing * followingWeight;

      return reputationScore;
    }
    const userReputation = calculateReputationScore(
      userFollowers,
      userFollowing
    );
    console.log("User Reputation Score:", userReputation);

    return {
      accepts: [
        {
          id: "farcaster",
          version: "vNext",
        },
        {
          id: "xmtp",
          version: "vNext",
        },
      ],
      image: (
        <div tw="flex flex-col  items-center w-full h-full bg-violet-300 text-white">
          <p style="">{portfolioData.display_name}</p>
          <p style="">{portfolioData.bio}</p>
          <p style="">
            <strong>Reputation score : {userReputation}</strong>
          </p>

          <p style="">
            <strong>Following: {portfolioData.following_count}</strong>
          </p>
          <p style="">
            <strong>Followers: {portfolioData.follower_count}</strong>
          </p>

          {/* <img
            src="https://i.imgur.com/vyADobm.jpg"
            alt="Profile Picture"
            style="border-radius: 50%; max-width: 30%; height: auto;"
          /> */}
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
