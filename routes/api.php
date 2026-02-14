<?php

use App\Http\Controllers\api\AppointmentController;
use App\Http\Controllers\api\DoctorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('doctors/{doctorId}/availability',[DoctorController::class,'CheckDoctorAvailability']);
Route::get('doctors',[DoctorController::class,'ListDoctors']);
Route::post('appointments',[AppointmentController::class,'BookAppointment']);

