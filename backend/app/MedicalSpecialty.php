<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class MedicalSpecialty extends Model
{

    protected $fillable = [
        'nome'
    ];

    public function entities()
    {
        return $this->belongsToMany(Entity::class, 'entity_medical_specialty', 'medical_specialty_id', 'entity_id');
    }

}
