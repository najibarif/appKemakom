<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ModuleProgress;
use Illuminate\Support\Facades\Auth;

class ModuleProgressController extends Controller
{
    /**
     * Get or create progress for current user
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get all progress for this user
        $progress = ModuleProgress::where('user_id', $user->id)
            ->orderBy('module_id')
            ->get();
        
        // If no progress exists, return default structure
        if ($progress->isEmpty()) {
            return response()->json([
                'completed_modules' => [],
                'module_scores' => [],
                'current_module_id' => 1,
            ]);
        }
        
        // Get the latest progress entry (assuming we store overall progress)
        $latestProgress = $progress->first();
        
        return response()->json([
            'completed_modules' => $latestProgress->completed_modules ?? [],
            'module_scores' => $latestProgress->module_scores ?? [],
            'current_module_id' => $latestProgress->current_module_id ?? 1,
        ]);
    }

    /**
     * Update progress for current user
     */
    public function update(Request $request)
    {
        $request->validate([
            'completed_modules' => 'nullable|array',
            'module_scores' => 'nullable|array',
            'current_module_id' => 'nullable|integer',
        ]);

        $user = Auth::user();
        
        // Get or create progress
        $progress = ModuleProgress::firstOrCreate(
            ['user_id' => $user->id, 'module_id' => 0], // module_id 0 for overall progress
            [
                'completed_modules' => [],
                'module_scores' => [],
                'current_module_id' => 1,
            ]
        );

        // Update progress
        if ($request->has('completed_modules')) {
            $progress->completed_modules = $request->completed_modules;
        }
        if ($request->has('module_scores')) {
            $progress->module_scores = $request->module_scores;
        }
        if ($request->has('current_module_id')) {
            $progress->current_module_id = $request->current_module_id;
        }

        $progress->save();

        return response()->json([
            'message' => 'Progress updated successfully',
            'progress' => [
                'completed_modules' => $progress->completed_modules,
                'module_scores' => $progress->module_scores,
                'current_module_id' => $progress->current_module_id,
            ]
        ]);
    }

    /**
     * Update specific module progress
     */
    public function updateModule(Request $request, $moduleId)
    {
        $request->validate([
            'completed' => 'nullable|boolean',
            'score' => 'nullable|integer|min:0|max:100',
        ]);

        $user = Auth::user();
        
        $progress = ModuleProgress::updateOrCreate(
            ['user_id' => $user->id, 'module_id' => $moduleId],
            [
                'completed' => $request->completed ?? false,
                'score' => $request->score,
            ]
        );

        return response()->json([
            'message' => 'Module progress updated successfully',
            'progress' => $progress
        ]);
    }
}
