import React from 'react'
import Doctors from './Doctors'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <ul>
      <li> <Link to="/doctors" >List doctors</Link> </li>
      <li>reserve an apointment</li>
    </ul>
  )
}

export default Home