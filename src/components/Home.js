import React, { useState, useEffect } from 'react'
import PostCards from "./PostCards"

export default function Home({ appBar }) {
    const [posts, setPosts] = useState("Loading...")
    const [reload, setReload] = useState("") //* we might not need this, we go back to home page

    useEffect(() => { // pulls all posts
        fetch("http://localhost:9292/home")
            .then(r => r.json())
            .then(d => setPosts(d.map(post => <PostCards key={post.id} post={post} />)))
    }, [reload])

    return (
        <>
            {appBar}
            <ul style={{ marginTop: "80px" }}>
                {posts}
            </ul>
        </>
    );
}