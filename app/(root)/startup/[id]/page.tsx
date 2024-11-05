import { START_UP_BY_ID_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
export const experimental_ppr = true;
const Startup = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(START_UP_BY_ID_QUERY, { id });
  if (!post) notFound();
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          width={1200}
          height={600}
          className="w-full rounded-xl h-80 object-cover"
        />
      </section>
    </>
  );
};

export default Startup;
