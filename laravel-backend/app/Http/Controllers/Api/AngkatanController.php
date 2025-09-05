<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Angkatan;
use Illuminate\Http\Request;

class AngkatanController extends Controller
{
    public function index()
    {
        $angkatan = Angkatan::orderBy('year', 'desc')->get();
        
        return response()->json([
            'data' => $angkatan
        ]);
    }

    public function show(Angkatan $angkatan)
    {
        return response()->json([
            'data' => $angkatan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|string|max:4',
            'total' => 'required|integer|min:0',
            'active' => 'required|integer|min:0',
            'achievements' => 'required|array',
        ]);

        $angkatan = Angkatan::create($request->all());

        return response()->json([
            'data' => $angkatan
        ], 201);
    }

    public function update(Request $request, Angkatan $angkatan)
    {
        $request->validate([
            'year' => 'sometimes|string|max:4',
            'total' => 'sometimes|integer|min:0',
            'active' => 'sometimes|integer|min:0',
            'achievements' => 'sometimes|array',
        ]);

        $angkatan->update($request->all());

        return response()->json([
            'data' => $angkatan
        ]);
    }

    public function destroy(Angkatan $angkatan)
    {
        $angkatan->delete();

        return response()->json([
            'message' => 'Angkatan deleted successfully'
        ]);
    }
}