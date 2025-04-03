<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

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
            ['id' => (string) Uuid::uuid4(), 'nome' => 'Alto tietê', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'Interior', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'ES', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'SP Interior', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'SP', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'SP2', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'MG', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'Nacional', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'SP CAV', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'RJ', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'SP', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'SP1', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'NE1', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'NE2', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'SUL', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id' => (string) Uuid::uuid4(), 'nome' => 'Norte', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
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
