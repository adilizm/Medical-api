<?php

namespace App\Http\Services;

use App\Models\Appointment;
use App\Models\Doctor;

use Carbon\Carbon;

class DoctorService
{

    public function ListDoctors()
    {
        $doctors = Doctor::get();
        return $doctors;
    }

    public function CheckDoctorAvailability($doctorId, $date)
    {
        $doctor = Doctor::find($doctorId);

        $bookedAppointments = $doctor->appointments()
            ->whereDate(Appointment::START_TIME, $date)
            ->pluck(Appointment::START_TIME)
            ->map(fn($time) => Carbon::parse($time)->format('H:i'));

        // Generate all slots
        $startTime = Carbon::createFromFormat('H:i', '09:00');
        $endTime = Carbon::createFromFormat('H:i', '17:00');
        $slotDuration = 30;

        $allSlots = [];
        $current = $startTime->copy();
        while ($current->lt($endTime)) {
            $allSlots[] = $current->format('H:i');
            $current->addMinutes($slotDuration);
        }

        // Filter available
        $availableSlots = array_filter($allSlots, fn($slot) => ! $bookedAppointments->contains($slot));

        return [
            'status' => 'success',
            'doctor_id' => $doctor->id,
            'date' => $date,
            'available_slots' => array_values($availableSlots),
        ];
    }
}
