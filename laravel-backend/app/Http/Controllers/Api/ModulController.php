<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Modul;
use Illuminate\Http\Request;

class ModulController extends Controller
{
    public function index()
    {
        $moduls = Modul::orderBy('date', 'desc')->get();
        
        return response()->json([
            'data' => $moduls
        ]);
    }

    public function show(Modul $modul)
    {
        return response()->json([
            'data' => $modul
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'date' => 'required|date',
            'file' => 'required|string',
        ]);

        $modul = Modul::create($request->all());

        return response()->json([
            'data' => $modul
        ], 201);
    }

    public function update(Request $request, Modul $modul)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string|max:255',
            'date' => 'sometimes|date',
            'file' => 'sometimes|string',
        ]);

        $modul->update($request->all());

        return response()->json([
            'data' => $modul
        ]);
    }

    public function destroy(Modul $modul)
    {
        $modul->delete();

        return response()->json([
            'message' => 'Modul deleted successfully'
        ]);
    }

    public function incrementDownloads(Modul $modul)
    {
        $modul->increment('downloads');

        return response()->json([
            'message' => 'Downloads incremented'
        ]);
    }
}