<?php

namespace App\Http\Controllers\Api;

use App\Entity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEntityRequest;
use App\Http\Requests\UpdateEntityRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EntityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Entity::with('regional')->with('medicalSpecialties');

        // Aplicar filtro se existir

        if ($request->has('filter') && !empty($request->filter)) {
            $query->where('nome_fantasia', 'like', '%' . $request->filter . '%')
                ->orWhere('razao_social', 'like', '%' . $request->filter . '%')
                ->orWhereHas('regional', function ($q) use ($request) {
                    $q->where('nome', 'like', '%' . $request->filter . '%');
                });
        }

        // Aplicar ordenação se existir
        $sortBy = $request->get('sortBy', 'id');
        $order = $request->get('order', 'asc');

        $query->orderBy($sortBy, $order);

        $entities = $query->paginate(10);

        // Retornando todas as entidades, em json.
        return response()->json($entities);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEntityRequest $request)
    {
        $validatedData = $request->all();

        // Convertendo 'ativa' para booleano e depois para inteiro (0 ou 1)
        $validatedData['ativa'] = filter_var($validatedData['ativa'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;


        $entidade = Entity::create($validatedData);


        // Associando especialidades médicas, se houver
        if (!empty($request->especialidades_medicas)) {
            $entidade->medicalSpecialties()->sync($request->especialidades_medicas);
        }

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
        $entidade = Entity::with('medicalSpecialties')->with('regional')->find($id);
        // Article::with('category')->get()->find($ids);

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
    public function update(UpdateEntityRequest $request, string $id): JsonResponse
    {

        $entidade = Entity::find($id);

        if (!$entidade) {
            return response()->json(['message' => 'Entidade não encontrada'], 404);
        }

        $entidade->update($request->all());

        // Associando especialidades médicas, se houver
        if (!empty($request->especialidades_medicas)) {
            $entidade->medicalSpecialties()->sync($request->especialidades_medicas);
        }

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

        if (!$entidade) {
            return response()->json(['message' => 'Entidade não encontrada'], 404);
        }

        $entidade->delete();

        return response()->json(['message' => 'Entidade excluída com sucesso'], 200);
    }
}
