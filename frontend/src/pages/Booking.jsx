import React, { useState, useEffect } from 'react'

function Reservation() {
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [patientName, setPatientName] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [availabilityMessage, setAvailabilityMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/doctors/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch doctors')
        return res.json()
      })
      .then(data => setDoctors(data.data || []))
      .catch(err => console.error('Error loading doctors:', err))
  }, [])

  // doctors are loaded from API into `doctors` state

  const hours = Array.from({ length: 16 }, (_, i) => {
    const minutes = 540 + i * 30  // 540 = 9 * 60 (9:00 AM)
    const hour = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hour.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  })

  const handleBooking = async () => {
    if (!doctorId || !date || !appointmentTime || !patientName) {
      setAvailabilityMessage('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // You can adjust the API endpoint and parameters as needed
      const response = await fetch('http://localhost:8000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_id: doctorId,
          patient_name: doctorId,
          appointment_time:appointmentTime,
          appointment_date:date
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
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>patient Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
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
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Doctor:</label>
        <select 
          value={doctorId} 
          onChange={(e) => setDoctorId(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        >
          <option value="">-- Select a Doctor --</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} {d.specialty ? `(${d.specialty})` : ''}
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
                checked={appointmentTime === hour}
                onChange={(e) => setAppointmentTime(e.target.value)}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              <span style={{ color: '#555' }}>{hour}</span>
            </label>
          ))}
        </div>
      </div>

{availabilityMessage && (
        <div style={{
          margin: '20px',
          padding: '15px',
          backgroundColor: availabilityMessage.includes('Error') ? '#f8d7da' : '#d4edda',
          border: `1px solid ${availabilityMessage.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`,
          borderRadius: '4px',
          color: availabilityMessage.includes('Error') ? '#721c24' : '#155724'
        }}>
          <p style={{ margin: 0 }}>{availabilityMessage}</p>
        </div>
      )}
      <button 
        onClick={handleBooking} 
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
          
        }}
      >
        {loading ? 'Checking...' : 'Check Availability & book appointment'}
      </button>

      
    </div>
  )
}

export default Reservation