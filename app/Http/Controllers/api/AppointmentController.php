<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Services\AppointmentService;
use Illuminate\Http\Request;

use Carbon\Carbon;

class AppointmentController extends Controller
{
    public function BookAppointment(Request $request)
    {
        $validatedData = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'patient_name' => 'required|string|max:255',
            'appointment_date' => 'required|date_format:Y-m-d',
            'appointment_time' => 'required',
        ]);

        $doctorId = $validatedData['doctor_id'];
        $patientName = $validatedData['patient_name'];
        $date = Carbon::createFromFormat('Y-m-d', $validatedData['appointment_date']);
        $start = Carbon::createFromFormat('H:i', $validatedData['appointment_time']);

         if ($date->isPast()) {
            return [
                'status' => 'error',
                'code' => 422,
                'message' => 'Cannot book past time'
            ];
        }

        if ($date->isWeekend()) {
            return [
                'status' => 'error',
                'code' => 422,
                'message' => 'Doctor not available on weekends'
            ];
        }
        
        if ($start->hour < 9 || $start->hour >= 17) {
            return [
                'status' => 'error',
                'code' => 422,
                'message' => 'Outside working hours'
            ];
        }

        $appointmentService = new AppointmentService();
        $result = $appointmentService->ReserveAppointment($doctorId, $patientName, $start, $date);

        if ($result['status'] === 'success') {
            return response()->json([
                'message' => 'Appointment booked successfully',
                'data' => $result['appointment']
            ], 201);
        }

        return response()->json([
            'message' => $result['message'] ?? 'Could not book appointment'
        ], $result['code'] ?? 400);
    }
}
