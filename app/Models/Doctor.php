<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{

    const ID = 'id';
    const NAME = 'name';
    const SPECIALIZATION = 'specialization';

    const TABLE_NAME = 'doctors';   

    protected $fillable = [
        'name',        
        'specialization',
    ];
}
