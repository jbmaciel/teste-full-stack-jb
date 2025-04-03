<?php

namespace App\Http\Controllers\Api;

use App\Entity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEntityRequest;
use App\Http\Requests\UpdateEntityRequest;
use Illuminate\Http\JsonResponse;
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
        $query = Entity::with('regional');

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

        $entidade = Entity::create($request->validated());

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
    public function update(UpdateEntityRequest $request, string $id): JsonResponse
    {

        $entidade = Entity::find($id);

        if (!$entidade) {
            return response()->json(['message' => 'Entidade não encontrada'], 404);
        }

        $entidade->update($request->all());

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
