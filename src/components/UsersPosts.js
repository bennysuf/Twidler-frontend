import React, { useState, useEffect } from 'react'
import PostCards from "./PostCards"

export default function UsersPosts({ currentUser, appBar }) {
    const [ownPosts, setOwnPosts] = useState([])
    const {posts} = currentUser

    useEffect(() => {
        if (posts.length <= 0) {
            setOwnPosts(<h1 style={{ textAlign: "center", font: "menu", fontSize: "" }}>Such emptiness</h1>)
                    } else {
                        setOwnPosts(posts.map(post => <PostCards key={post.id} post={post} />))
                    }
        
        // fetch(`http://localhost:9292/posts/${currentUser.user_id}`)
        //     .then(r => r.json())
        //     .then(d => {
        //         if (d.posts.length <= 0) {
        //             setOwnPosts(<h1 style={{ textAlign: "center", font: "menu", fontSize: "" }}>Such emptiness</h1>)
        //         } else {
        //             setOwnPosts(d.posts.map(post => <PostCards key={post.id} post={post} />))
        //         }
        //     })

    }, [])

    console.log("usersPosts", currentUser)

    return (
        <>
            {appBar}
            <ul style={{ marginTop: "80px" }}>
                {ownPosts}
            </ul>
        </>
    )
}
