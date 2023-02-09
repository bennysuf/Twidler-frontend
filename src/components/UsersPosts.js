import React, { useState, useEffect } from 'react'
import PostCards from "./PostCards"

export default function UsersPosts({currentUser}) {
    const [ownPosts, setOwnPosts] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:9292/posts/${currentUser.user_id}`)
        .then(r => r.json())
        .then(d => setOwnPosts(d))
    },[])


    const cards = ownPosts.map(post => <PostCards key={post.id} post={post}/>)

    return (
        <div>
            {cards}
        </div>
    )
}
