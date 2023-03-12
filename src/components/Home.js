// import React, { useState, useEffect } from 'react'
import PostCards from "./PostCards"

export default function Home({ appBar, posts }) {
    // const [posts, setPosts] = useState("Loading...")

    // console.log("check posts Home", posts)

    // useEffect(() => { // pulls all posts
    //     fetch("http://localhost:9292/home")
    //         .then(r => r.json())
    //         .then(d => setPosts(d.map(post => <PostCards key={post.id} post={post} />)))
    // }, [])
   const allPosts = posts.map(post => <PostCards key={post.id} post={post} />)
   
    return (
        <>
            {appBar}
            <ul style={{ marginTop: "80px" }}>
                {allPosts}
            </ul>
        </>
    );
}