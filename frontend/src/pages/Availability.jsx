import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const styles = `
  .availability-container { max-width: 420px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
  .availability-label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
  .availability-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; box-sizing: border-box; }
  .availability-button { width: 100%; padding: 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; font-size: 16px; font-weight: bold; cursor: pointer; }
  .availability-button[disabled] { background-color: #ccc; cursor: not-allowed; }
  .slots-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 16px; }
  .slot { padding: 8px; border: 1px solid #ddd; text-align: center; color: #333; }
  .slot.unavailable { color: #whait; border-color: #f5c6cb; background-color: red; }
  .message { margin-top: 12px; padding: 10px; font-size: 14px; }
  .message.error { color: #a00; }
`;

function Availability() {
    const { id } = useParams(); // id of the doctor
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [error, setError] = useState(null);
    const [showSlots, setShowSlots] = useState(false);

    const fullSlots = Array.from({ length: 17 }, (_, i) => {
        const minutes = 540 + i * 30; // 9:00 AM start
        const hour = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hour.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    });

    const handleCheckdoctorAvailability = async () => {
        setError(null);
        
        if (!date) {
            setError('Please select a date');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8000/api/doctors/${id}/availability?date=${encodeURIComponent(date)}`
            );
            const data = await response.json();
            if (data && data.status === 'success') {
                setAvailableSlots(Array.isArray(data.available_slots) ? data.available_slots : []);
                setShowSlots(true);
            } else {
                setAvailableSlots([]);
                setError(data?.message || 'No availability data');
            }
        } catch (err) {
            console.error('Error checking availability:', err);
            setError('Error checking availability');
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="availability-container">
            <style>{styles}</style>

            <div style={{ marginBottom: '12px' }}>
                <label className="availability-label">Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="availability-input"
                />
            </div>

            <button
                onClick={handleCheckdoctorAvailability}
                disabled={loading}
                className="availability-button"
            >
                {loading ? 'Checking...' : 'Check Availability'}
            </button>

            {error && <div className="message error">{error}</div>}

            {availableSlots && showSlots  && (
                <div>
                    <div style={{ marginTop: 14, fontWeight: 'bold' }}>Available time ranges</div>
                    <div className="slots-grid">
                        {fullSlots.map((s) => {
                            const isAvailable = availableSlots.includes(s);
                            return (
                                <div key={s} className={`slot ${isAvailable ? '' : 'unavailable'}`}>
                                    {s}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Availability;
