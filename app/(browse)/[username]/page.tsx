import { getUserByUserName } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import { isFollowingUser } from '@/lib/follow-service'
import { Actions } from './_components/actions'
interface UserPageProps{
    params : {
        username : string
    }
}
const page = async ({params}:UserPageProps) => {
  const user = await getUserByUserName(params.username)

  if(!user){
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id)

  return (
    <div>
      <p>User name : {user.username}</p>
      <p>User id : {user.id}</p>
      <p>isFollowing : {isFollowing.toString()}</p>
      <Actions isFollowing = {isFollowing}/>
    </div>
  )
}

export default page
