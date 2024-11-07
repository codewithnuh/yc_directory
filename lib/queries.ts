import { defineQuery } from "next-sanity";
export const STARTUPS_QUERIES =
  defineQuery(`*[_type=='startup'&& defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,
   author->{_id,name,bio,image},
    views,
    description,
    category,
    image,
    _createdAt
}
`);
export const START_UP_BY_ID_QUERY =
  defineQuery(`*[_type=='startup'&& _id==$id][0]{
  _id,
  title,
  _createdAt,
   author->{_id,username,name,bio,image},
    views,
    description,
    category,
    image,
    pitch
}
`);
export const START_UP_VIEWS_QUERY =
  defineQuery(`*[_type=='startup'&& _id==$id][0]{
  _id,views
}`);
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
  `*[_type=='author' && githubId==$id][0]{  _id,id,  username,  name,email,  bio,  image}`
);
