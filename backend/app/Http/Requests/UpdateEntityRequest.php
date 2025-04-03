<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEntityRequest extends FormRequest
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
            'razao_social' => 'sometimes|required|string|max:255',
            'nome_fantasia' => 'sometimes|string|max:255',
            'cnpj' => 'sometimes|string|max:14|unique:entities,cnpj',
            'regional' => 'sometimes|string|exists:regionals,id',
            'data_inauguracao' => 'sometimes|date',
            'ativa' => 'sometimes|boolean',
            'especialidades_medicas' => 'sometimes|array',
        ];
    }
}
