import { auth } from "@/auth";
import SearchBar from "@/components/SearchBar";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERIES } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERIES,
    params,
  });
  const session = await auth();
  console.log(session?.id);
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup <br />
          connect with entrepreneurs
        </h1>
        <p className="sub-heading capitalize !max-w-3xl">
          Submit ideas, vote on pitches , and get noticed in virtual
          competitions.
        </p>
        <SearchBar query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post?._id} post={post as StartupTypeCard} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
