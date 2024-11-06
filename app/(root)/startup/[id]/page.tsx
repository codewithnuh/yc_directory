import { START_UP_BY_ID_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "@/components/ReactMarkdown";
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
          src={post.image as string}
          alt="thumbnail"
          width={1200}
          height={600}
          className="w-full rounded-xl h-80 object-cover"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <div className="w-16 h-16 overflow-hidden rounded-full flex items-center justify-center">
                <Image
                  src={post.author?.image as string}
                  width={64}
                  height={64}
                  alt="author"
                  className="object-cover h-full w-full drop-shadow-lg"
                />
              </div>
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          <article className="prose max-4xl font-sans break-all">
            {post.pitch ? (
              <ReactMarkdown markdown={post.pitch} />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </article>
        </div>
        <hr className="divider" />
        {/* Editor */}
      </section>
    </>
  );
};

export default Startup;
