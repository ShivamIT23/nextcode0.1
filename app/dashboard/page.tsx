import { useSession } from 'next-auth/react'
import React from 'react'

export default function Page() {
    const {data:session} = useSession();
  return (
    <div>
        {session ?`${session.user}`: "hello"}
    </div>
  )
}
