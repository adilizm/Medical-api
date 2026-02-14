<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoctorResource;
use App\Http\Services\DoctorService;
use App\Models\Doctor;
use Illuminate\Http\Request;

class doctorController extends Controller
{
    public function list_doctors()
    {
        $doctorService = new DoctorService();
        $doctors = $doctorService->list_doctors();

        return DoctorResource::collection($doctors)
            ->additional(['status' => 'success']);

    }
}
