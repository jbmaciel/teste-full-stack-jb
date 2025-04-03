<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEntityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'razao_social' => 'required|string|max:255',
            'nome_fantasia' => 'required|string|max:255',
            'cnpj' => 'required|string|max:14|unique:entities,cnpj',
            'regional' => 'required|string|exists:regionals,id',
            'data_inauguracao' => 'required|date',
            'ativa' => 'boolean',
            'especialidades_medicas' => 'array',
        ];
    }
}
