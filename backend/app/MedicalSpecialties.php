<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class MedicalSpecialties extends Model
{

    protected $fillable = [
        'nome'
    ];

    public function entidades()
    {
        return $this->belongsToMany(Entity::class);
    }

}
