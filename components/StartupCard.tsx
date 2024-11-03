import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAT: createdAT,
    views,
    author: { _id: authorId, name },
    title,
    _id,
    image,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card-date">{formatDate(createdAT)}</p>
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
        </div>
      </div>
    </li>
  );
};

export default StartupCard;
