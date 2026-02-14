import React from 'react'
import Doctors from './Doctors'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <ul>
      <li> <Link to="/doctors" >List doctors</Link> </li>
      <li> <Link to="booking" >reserve an apointment</Link></li>
    </ul>
  )
}

export default Home