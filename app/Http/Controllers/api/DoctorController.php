<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoctorResource;
use App\Http\Services\DoctorService;
use App\Models\Doctor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class doctorController extends Controller
{
    public function ListDoctors()
    {
        $doctorService = new DoctorService();
        $doctors = $doctorService->ListDoctors();

        return DoctorResource::collection($doctors)
            ->additional(['status' => 'success']);
    }

    public function CheckDoctorAvailability(Request $request, $doctorId)
    {
        $request->validate([
            'doctorId' => 'exists:doctors,id',
        ]);

        $date = $request->query('date') ?? Carbon::today()->toDateString();

       // return $date;
        
        $dateCarbon = Carbon::parse($date);

        if ($dateCarbon->isWeekend()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Selected date falls on a weekend. Please choose a weekday.',
            ], 400);
        }

        $date = $dateCarbon->toDateString();

        $doctorService = new DoctorService();
        $CheckDoctorAvailability = $doctorService->CheckDoctorAvailability($doctorId, $date);

        return response()->json($CheckDoctorAvailability);
    }
}
