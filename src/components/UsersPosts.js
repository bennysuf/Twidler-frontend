import PostCards from "./PostCards";

export default function UsersPosts({ currentUser, appBar, usersPost }) {
  return (
    <>
      {appBar}
      <div style={{ marginTop: "80px" }}>
        {usersPost ? (
          usersPost.map((post) => <PostCards key={post.id} post={post} />)
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "100px" }}>
            Such emptiness
          </h1>
        )}
      </div>
    </>
  );
}
