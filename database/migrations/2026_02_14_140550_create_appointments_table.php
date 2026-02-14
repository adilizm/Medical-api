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
        Schema::create(Appointment::TABLE_NAME, function (Blueprint $table) {
            $table->id();
            $table->foreignId(Appointment::DOCTOR_ID)->constrained(Doctor::TABLE_NAME)->onDelete('cascade');
            $table->string(Appointment::PATIENT_NAME);
            $table->dateTime(Appointment::START_TIME);
            $table->dateTime(Appointment::END_TIME);
            $table->enum(Appointment::STATUS, ['new','scheduled', 'completed', 'canceled'])->default('new');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(Appointment::TABLE_NAME);
    }
};
