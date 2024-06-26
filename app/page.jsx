import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "FC Portfolio",
    version: "vNext",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        "/api/frames",
        process.env.VERCEL_URL
          ? `https://fc-portfolio.vercel.app/`
          : "http://localhost:3000"
      )
    ),
  };
}

export default function Page() {
  return <span>My existing page</span>;
}
