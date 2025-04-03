<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\MedicalSpecialty;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;

class MedicalSpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medical_specialties = MedicalSpecialty::all();

        return response()->json($medical_specialties);
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
            'nome' => 'unique:medical_specialties,nome|required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $medical_specialties = MedicalSpecialty::create([
            'nome' => $request->nome,
        ]);

        return response()->json($medical_specialties, 201);
    }

    /**
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $medical_specialtie = MedicalSpecialty::find($id);

        if (!$medical_specialtie) {
            return response()->json(['message' => 'Especialidade não encontrada'], 404);
        }

        return response()->json($medical_specialtie);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function update(Request $request, $id)
    {
        $medical_specialtie = MedicalSpecialty::find($id);

        if (!$medical_specialtie) {
            return response()->json(['message' => 'Especialidade não encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $medical_specialtie->update([
            'nome' => $request->nome,
        ]);

        return response()->json($medical_specialtie);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $medical_specialtie = MedicalSpecialty::find($id);

        if (!$medical_specialtie) {
            return response()->json(['message' => 'Especialidade não encontrada'], 404);
        }

        $medical_specialtie->delete();

        return response()->json(['message' => 'Especialidade excluída com sucesso'], 200);
    }
}
