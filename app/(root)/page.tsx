import SearchBar from "@/components/SearchBar";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const posts = [
    {
      _createdAT: new Date(),
      views: 55,
      author: { _id: 1, name: "Elex" },
      _id: 1,
      description: "This is description",
      image: "/logo.png",
      category: "Robots",
      title: "we robots",
    },
  ];
  const query = (await searchParams).query;
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
          {posts.map((post: StartupTypeCard) => (
            <StartupCard key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </>
  );
}
