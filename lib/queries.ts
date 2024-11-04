import { defineQuery } from "next-sanity";
export const STARTUPS_QUERIES =
  defineQuery(`*[_type=='startup'&& defined(slug.current)] | order(_createdAt desc) {
  _id,
   author->{_id,name,bio,image},
    views,
    description,
    category,
    image,
    _createdAt
}
`);
