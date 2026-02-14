import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const styles = `
  .doctors-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .doctors-heading {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  .doctors-loading,
  .doctors-error {
    padding: 15px;
    text-align: center;
    font-size: 16px;
  }

  .doctors-loading {
    color: #666;
  }

  .doctors-error {
    color: #d32f2f;
    background-color: #ffebee;
    border: 1px solid #d32f2f;
    border-radius: 4px;
  }

  .doctors-empty {
    padding: 20px;
    text-align: center;
    color: #999;
  }

  .doctors-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .doctors-table thead {
    background-color: #f5f5f5;
  }

  .doctors-table th {
    padding: 12px;
    text-align: left;
    font-weight: bold;
    color: #333;
    border: 1px solid #ddd;
  }

  .doctors-table td {
    padding: 12px;
    color: #666;
    border: 1px solid #ddd;
  }

  .doctors-table tbody tr:hover {
    background-color: #fafafa;
  }
`

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
    return (
      <>
        <style>{styles}</style>
        <div className="doctors-loading">Loading doctors...</div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="doctors-error">Error: {error}</div>
      </>
    )
  }

  return (
    <>
      <style>{styles}</style>
      <div className="doctors-container">
        <h1 className="doctors-heading">Doctors</h1>
        {doctors.length === 0 ? (
          <p className="doctors-empty">No doctors found</p>
        ) : (
          <table className="doctors-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td> <Link to={`/availability/${doctor.id}`}>Check Availability</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Doctors