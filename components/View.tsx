import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { START_UP_VIEWS_QUERY } from "@/lib/queries";

const formatViews = (number: number) => {
  if (number < 1000) {
    return `${number} view${number === 1 ? "" : "s"}`;
  } else if (number < 1000000) {
    return `${(number / 1000).toFixed(1)}K view${number === 1 ? "" : "s"}`;
  } else if (number < 1000000000) {
    return `${(number / 1000000).toFixed(1)}M view${number === 1 ? "" : "s"}`;
  } else {
    return `${(number / 1000000000).toFixed(1)}B view${number === 1 ? "" : "s"}`;
  }
};

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(START_UP_VIEWS_QUERY, { id });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black"> {formatViews(totalViews)}</span>
      </p>
    </div>
  );
};

export default View;
