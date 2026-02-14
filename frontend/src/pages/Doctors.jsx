import React, { useState, useEffect } from 'react'


function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/doctors/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch doctors')
        }
        return res.json()
      })
      .then(data => {
        setDoctors(data.data)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>Loading doctors...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Doctors</h1>
      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Doctors