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
    }

    fetchPosts()
  }, [handlePost])

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* Posts */}
    </div>
  )
}

export default Feed
