<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LearningModule;
use Illuminate\Http\Request;

class LearningModuleController extends Controller
{
    public function index()
    {
        $modules = LearningModule::where('is_active', true)
            ->orderBy('order', 'asc')
            ->orderBy('id', 'asc')
            ->get();
        
        return response()->json([
            'data' => $modules
        ]);
    }

    public function show(LearningModule $learningModule)
    {
        if (!$learningModule->is_active) {
            return response()->json([
                'message' => 'Module not found'
            ], 404);
        }

        return response()->json([
            'data' => $learningModule
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'simulation_code' => 'nullable|string',
            'quiz' => 'nullable|array',
            'duration' => 'nullable|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $module = LearningModule::create($request->all());

        return response()->json([
            'data' => $module
        ], 201);
    }

    public function update(Request $request, LearningModule $learningModule)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'content' => 'sometimes|string',
            'simulation_code' => 'nullable|string',
            'quiz' => 'nullable|array',
            'duration' => 'nullable|string|max:50',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $learningModule->update($request->all());

        return response()->json([
            'data' => $learningModule
        ]);
    }

    public function destroy(LearningModule $learningModule)
    {
        $learningModule->delete();

        return response()->json([
            'message' => 'Learning module deleted successfully'
        ]);
    }
}
