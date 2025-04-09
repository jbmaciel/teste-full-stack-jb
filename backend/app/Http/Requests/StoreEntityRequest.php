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
            'ativa' => 'required|in:true,false,1,0,"1","0"',
            'especialidades_medicas' => 'array',
            'especialidades_medicas.*' => 'exists:medical_specialties,id',
        ];
    }

    // Mensagens de erro personalizadas (opcional)
    public function messages()
    {
        return [
            'razao_social.required' => 'O campo razão social é obrigatório.',
            'nome_fantasia.required' => 'O campo nome fantasia é obrigatório.',
            'cnpj.required' => 'O campo cnpj é obrigatório.',
            'cnpj.unique' => 'Este cnpj já está cadastrado.',
            'data_inauguracao.required' => 'O campo data de inauguração é obrigatório',
            'especialidades_medicas.exists' => 'Informe pelo menos 5 especialidades'
        ];
    }
}
