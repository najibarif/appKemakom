<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Illuminate\Http\Request;

class AlumniController extends Controller
{
    public function index()
    {
        $alumni = Alumni::orderBy('year', 'desc')->get();
        
        return response()->json([
            'data' => $alumni
        ]);
    }

    public function show(Alumni $alumni)
    {
        return response()->json([
            'data' => $alumni
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|string|max:4',
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'thesis' => 'required|string',
        ]);

        $alumni = Alumni::create($request->all());

        return response()->json([
            'data' => $alumni
        ], 201);
    }

    public function update(Request $request, Alumni $alumni)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'year' => 'sometimes|string|max:4',
            'company' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'thesis' => 'sometimes|string',
        ]);

        $alumni->update($request->all());

        return response()->json([
            'data' => $alumni
        ]);
    }

    public function destroy(Alumni $alumni)
    {
        $alumni->delete();

        return response()->json([
            'message' => 'Alumni deleted successfully'
        ]);
    }
}