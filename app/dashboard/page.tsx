import React from 'react'
import Client from '../dashboard/client'
import Freelancer from './freelancer'

const Dashboard = (user = "client") => {
  return (
    <div className=' w-screen h-full bg-white'>{user != "client" ? <Freelancer /> : <Client />}</div>
  )
}

export default Dashboard