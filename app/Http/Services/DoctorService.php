<?php

namespace App\Http\Services;

use App\Enums\ShopifyApiEndPointEnum;
use App\Models\Doctor;
use App\Models\Fbpixel;
use App\Models\Product;
use App\Traits\RequestCallTrait;

class DoctorService
{

    public function list_doctors()
    {
        $doctors = Doctor::get();
        return $doctors;
    }   
}
