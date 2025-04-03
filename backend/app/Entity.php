<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    protected $fillable = [
        'razao_social',
        'nome_fantasia',
        'cnpj',
        'regional',
        'data_inauguracao',
        'ativa'
    ];

    protected $casts = [
        'ativa' => 'boolean',
        'data_inauguracao' => 'date',
    ];

    // Relacionamento com o model Regional
    public function regional()
    {
        return $this->belongsTo(Regional::class, 'regional', 'id');
    }

    public function medicalSpecialties()
    {
        return $this->belongsToMany(MedicalSpecialty::class, 'entity_medical_specialty', 'entity_id', 'medical_specialty_id');
    }
}
