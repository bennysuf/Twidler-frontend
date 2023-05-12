import PostCards from "./PostCards";

export default function Home({ appBar, posts }) {

  const allPosts = posts.map((post) => <PostCards key={post.id} post={post} />);

  return (
    <>
      {appBar}
      <ul style={{ marginTop: "80px" }}>{allPosts}</ul>
    </>
  );
}
