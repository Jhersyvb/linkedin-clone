import { useEffect, useState } from 'react'
import Input from './Input'
import { useRecoilState } from 'recoil'
import { handlePostState, useSSRPostsState } from '../atoms/postAtom'

function Feed() {
  const [realtimePosts, setRealtimePosts] = useState([])
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const responseData = await response.json()
      setRealtimePosts(responseData)
      setHandlePost(false)
      setUseSSRPosts(false)
    }

    fetchPosts()
    console.log('handle post', handlePost)
  }, [handlePost])

  console.log(realtimePosts)

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {realtimePosts.map((post, index) => (
        <>
          <img src={post.photoUrl} alt="" />
          <div>{post.input}</div>
        </>
      ))}
    </div>
  )
}

export default Feed
