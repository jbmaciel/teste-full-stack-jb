<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateMedicalSpecialtiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medical_specialties', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('nome')->unique();
            $table->timestamps();
        });

        // Inserir dados iniciais na migration
        DB::table('medical_specialties')->insert([
            ['nome' => 'Pediatria', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Cardiologia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Ortopedia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Neurologia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Dermatologia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Psiquiatria', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Oftalmologia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Ginecologia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Urologia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Oncologia', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medical_specialties');
    }
}
