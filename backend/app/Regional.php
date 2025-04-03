<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    // protected $table = 'regionals';
    protected $primaryKey = 'id';
    public $incrementing = false; // Desabilitando auto incremento
    protected $keyType = 'string'; // Definindo o tipo da chave primária como string
    
    protected $fillable = ['id', 'nome']; 

    public function entidades()
    {
        return $this->belongsToMany(Entity::class);
    }

}
