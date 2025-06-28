import { useState } from 'react'
import Profile from './Components/Assignment1'
import './App.css'

function App() {
  const data = {
    src: "", 
    fullName: "JS",
    city: "ASR",
    socialLife: [{
      title: "Follower",
      count: "80"
    }, {
      title: "Likes",
      count: "800"
    }, {
      title: "Photos",
      count: "100"
    }]
  }


  return (
    <Profile userProfile={data} />
  )
}

export default App
