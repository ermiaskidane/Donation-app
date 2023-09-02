import React from 'react'
import {MemberForm} from './components/member-form'

function MemberPage() {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MemberForm />
      </div>
    </div>
  )
}

export default MemberPage