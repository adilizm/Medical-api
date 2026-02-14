<?php

namespace App\Http\Services;

use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AppointmentService
{

    public function ReserveAppointment($doctorId, $patientName, $start_time, $date,)
    {
      
       return DB::transaction(function () use ($doctorId, $patientName, $date, $start_time) {

            $doctor = Doctor::where('id', $doctorId)->lockForUpdate()->first();
            if (!$doctor) {
                return [ 'status' => 'error', 'code' => 404, 'message' => 'Doctor not found' ];
            }

            $overlap = Appointment::where('doctor_id', $doctorId)
                ->whereDate('start_time', $date)
                ->whereTime('start_time', $start_time)
                ->lockForUpdate()
                ->exists();

            if ($overlap) {
                return [ 'status' => 'conflict', 'code' => 409, 'message' => 'Slot was just booked. Please choose another time' ];
            }

            $start =  $date->copy()->setTimeFrom($start_time);

            $end = (clone $start)->addMinutes(30);

           
            $appointment = Appointment::create([
                'doctor_id' => $doctorId,
                'patient_name' => $patientName,
                'start_time' => $start->format('Y-m-d H:i:s'),
                'end_time' => $end->format('Y-m-d H:i:s'),
                'status' => 'scheduled',
            ]);

            return [ 'status' => 'success', 'code' => 201, 'appointment' => $appointment ];
        }, 5); // 5 attempts for deadlock retry 

    }
}
