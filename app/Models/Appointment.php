<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    const ID = 'id';
    const DOCTOR_ID = 'doctor_id';
    const PATIENT_NAME = 'patient_name';
    const START_TIME = 'start_time'; // datetime of the appointment 
    const END_TIME = 'end_time';
    const STATUS = 'status'; // 'new', 'scheduled', 'completed', 'canceled'


    const TABLE_NAME = 'appointments';   

    protected $fillable = [
        self::DOCTOR_ID,
        self::PATIENT_NAME,
        self::START_TIME,
        self::END_TIME,
        self::STATUS,
    ];
}
