import React, { useState } from 'react'

function Reservation() {
  const [specialty, setSpecialty] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [availabilityMessage, setAvailabilityMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Psychiatry',
    'Radiology'
  ]

  const hours = Array.from({ length: 17 }, (_, i) => {
    const minutes = 540 + i * 30  // 540 = 9 * 60 (9:00 AM)
    const hour = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hour.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  })

  const handleCheckAvailability = async () => {
    if (!specialty || !date || !time) {
      setAvailabilityMessage('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // You can adjust the API endpoint and parameters as needed
      const response = await fetch('http://localhost:8000/api/appointments/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          specialty,
          date,
          time
        })
      })

      const data = await response.json()
      
      if (data.status === 'success') {
        setAvailabilityMessage(`${data.message || 'Appointments available!'}`)
      } else {
        setAvailabilityMessage(`${data.message || 'No appointments available for this time'}`)
      }
    } catch (error) {
      setAvailabilityMessage(`Error checking availability: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Book an Appointment</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Specialty:</label>
        <select 
          value={specialty} 
          onChange={(e) => setSpecialty(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        >
          <option value="">-- Select a Specialty --</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: '#555' }}>Time:</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {hours.map((hour) => (
            <label key={hour} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="time"
                value={hour}
                checked={time === hour}
                onChange={(e) => setTime(e.target.value)}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              <span style={{ color: '#555' }}>{hour}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleCheckAvailability} 
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        {loading ? 'Checking...' : 'Check Availability'}
      </button>

      {availabilityMessage && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: availabilityMessage.includes('Error') ? '#f8d7da' : '#d4edda',
          border: `1px solid ${availabilityMessage.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`,
          borderRadius: '4px',
          color: availabilityMessage.includes('Error') ? '#721c24' : '#155724'
        }}>
          <p style={{ margin: 0 }}>{availabilityMessage}</p>
        </div>
      )}
    </div>
  )
}

export default Reservation