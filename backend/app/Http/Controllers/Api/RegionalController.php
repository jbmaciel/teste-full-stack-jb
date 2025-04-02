<?php

namespace App\Http\Controllers\Api;

use App\Regional;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class RegionalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $regionais = Regional::all();

        // Retornando todas as regionais, em json.
        return response()->json($regionais);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Criando a regional com uuid gerado
        $regional = Regional::create([
            'id' => (string) Uuid::uuid4(),
            'nome' => $request->nome,
        ]);

        return response()->json($regional, 201);
    }

    /**
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $regional = Regional::find($id);

        if (!$regional) {
            return response()->json(['message' => 'Regional não encontrada'], 404);
        }

        return response()->json($regional);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Regional  $regional
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $regional = Regional::find($id);

        if (!$regional) {
            return response()->json(['message' => 'Regional não encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $regional->update([
            'nome' => $request->nome,
        ]);

        return response()->json($regional);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Regional  $regional
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $regional = Regional::find($id);

        if (!$regional) {
            return response()->json(['message' => 'Regional não encontrada'], 404);
        }

        $regional->delete();

        return response()->json(['message' => 'Regional excluída com sucesso'], 200);
    }
}
