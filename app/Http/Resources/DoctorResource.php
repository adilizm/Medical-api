<?php

namespace App\Http\Resources;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use PhpParser\Comment\Doc;

class DoctorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
            'id' => $this[Doctor::ID],
            'name' => $this[Doctor::NAME],
            'specialty' => $this[Doctor::SPECIALIZATION],
           
        ];
    }
}
