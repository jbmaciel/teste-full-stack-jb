<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    protected $fillable = [
        'razao_social', 'nome_fantasia', 'cnpj', 'regional', 'data_inauguracao', 'ativa', 'especialidades_medicas'
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
}
