<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateRegionalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regionals', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Usando uuid como chave primaria
            $table->string('nome');
            $table->timestamps();
        });

        // Inserir dados iniciais na migration
        DB::table('regionals')->insert([
            ['nome' => 'Alto tietê', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Interior', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'ES', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'SP Interior', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'SP', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'SP2', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'MG', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Nacional', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'SP CAV', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'RJ', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'SP', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'SP1', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'NE1', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'NE2', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'SUL', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['nome' => 'Norte', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('regionals');
    }
}
