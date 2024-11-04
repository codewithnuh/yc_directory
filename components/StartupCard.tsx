import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const StartupCard = ({ post }: { post }) => {
  const {
    _createdAt: createdAt,
    views,
    author: { _id: authorId, name },
    title,
    _id,
    image,
    description,
    category,
  } = post;
  console.log(post);
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card-date">{formatDate(createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="text-primary size-5" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h2 className="text-26-semibold line-clamp-1">{title}</h2>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <div className="rounded-full bg-black w-8 h-8"></div>
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image
          src={image}
          width={250}
          height={250}
          className="startup-card_img"
          alt="IMG"
        />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
