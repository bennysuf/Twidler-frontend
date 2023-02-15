import React, { useState, useEffect } from 'react'
import PostCards from "./PostCards"

export default function UsersPosts({ currentUser, appBar }) {
    const [ownPosts, setOwnPosts] = useState([])

    useEffect(() => {
        console.log("currentUser", currentUser)
        fetch(`http://localhost:9292/posts/${currentUser.user_id}`)
            .then(r => r.json())
            .then(d => {
                if (d[0] === undefined) {
                    setOwnPosts(<h1 style={{textAlign: "center", font: "menu", fontSize: ""}}>Such emptiness</h1>)
                } else {
                    setOwnPosts(d.map(post => <PostCards key={post.id} post={post} />))
                }
            })

    }, [])

    return (
        <>
                {appBar}
            <ul style={{ marginTop: "80px" }}>
                {ownPosts}
            </ul>
        </>
    )
}
