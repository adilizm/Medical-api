<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Doctor extends Model
{
    use HasFactory;

    const ID = 'id';
    const NAME = 'name';
    const SPECIALIZATION = 'specialization';

    const TABLE_NAME = 'doctors';   

    protected $fillable = [
        'name',        
        'specialization',
    ];
}
