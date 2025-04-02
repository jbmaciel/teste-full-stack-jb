<?php

namespace App\Http\Controllers\Api;

use App\Entity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EntityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $entities = Entity::all();
        // Retornando todas as entidades, em json.
        return response()->json($entities);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        // Definindo regras de validação
        $validator = Validator::make($request->all(), [
            'razao_social' => 'required|string|max:255',
            'nome_fantasia' => 'required|string|max:255',
            'cnpj' => 'required|string|unique:entities,cnpj|max:14',
            'regional' => 'required',
            'data_inauguracao' => 'required|date',
            'ativa' => 'boolean',
            'especialidades_medicas' => 'array'
        ]);


        // Verificando se a validação falhou
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Criando a entidade
        $entidade = Entity::create([
            'razao_social' => $request->razao_social,
            'nome_fantasia' => $request->nome_fantasia,
            'cnpj' => $request->cnpj,
            'regional' => $request->regional,
            'data_inauguracao' => $request->data_inauguracao,
            'ativa' => $request->ativa ?? true,
            'especialidades_medicas' => $request->especialidades_medicas ?? '[]',
        ]);

        return response()->json($entidade, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Entity  $entity
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $entidade = Entity::find($id);

        if (!$entidade) {
            return response()->json(['message' => 'Entidade não encontrada'], 404);
        }

        return response()->json($entidade);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Entity  $entity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $entidade = Entity::find($id);

        if (!$entidade) {
            return response()->json(['message' => 'Entidade não encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'razao_social' => 'required|string|max:255',
            'nome_fantasia' => 'required|string|max:255',
            'cnpj' => 'required|string|unique:entities,cnpj|max:14',
            'regional' => 'required',
            'data_inauguracao' => 'required|date',
            'ativa' => 'boolean',
            'especialidades_medicas' => 'array'
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $entidade->update([
            'razao_social' => $request->razao_social,
            'nome_fantasia' => $request->nome_fantasia,
            'cnpj' => $request->cnpj,
            'regional' => $request->regional,
            'data_inauguracao' => $request->data_inauguracao,
            'ativa' => 'boolean',
            'especialidades_medicas' => 'array'
        ]);

        return response()->json($entidade);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $entidade = Entity::find($id);

        if(!$entidade) {
            return response()->json(['message' => 'Entidade não encontrada'], 404);
        }

        $entidade->delete();

        return response()->json(['message' => 'Entidade excluída com sucesso'], 200);
    }
}
