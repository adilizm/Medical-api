<?php

use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table(Appointment::TABLE_NAME, function (Blueprint $table) {
            $table->unique([Doctor::ID, Appointment::START_TIME], 'unique_doctor_slot');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(Appointment::TABLE_NAME, function (Blueprint $table) {
            $table->dropUnique('unique_doctor_slot');
        });
    }
};
