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
        
        // Get all progress for this user, ordered by module_id
        $progressRecords = ModuleProgress::where('user_id', $user->id)
            ->orderBy('module_id')
            ->get();
        
        // Build completed_modules array and module_scores object from individual records
        $completedModules = [];
        $moduleScores = [];
        $currentModuleId = null;
        
        foreach ($progressRecords as $record) {
            // Skip the overall progress record (module_id = 0)
            if ($record->module_id == 0) {
                $currentModuleId = $record->current_module_id ?? 1;
                continue;
            }
            
            // Add to completed_modules if marked as completed
            if ($record->completed) {
                $completedModules[] = (int)$record->module_id;
            }
            
            // Store score if available
            if ($record->score !== null) {
                $moduleScores[$record->module_id] = (int)$record->score;
            }
        }
        
        // If no current_module_id found in db, default to 1
        if ($currentModuleId === null) {
            $currentModuleId = 1;
        }
        
        return response()->json([
            'completed_modules' => $completedModules,
            'module_scores' => $moduleScores,
            'current_module_id' => $currentModuleId,
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
        
        // Update individual module progress records
        if ($request->has('completed_modules')) {
            $completedModules = $request->input('completed_modules', []);
            
            // Get all modules from the request to update their completed status
            $moduleIds = array_keys(
                array_merge(
                    $request->input('module_scores', []),
                    array_flip($completedModules)
                )
            );
            
            foreach ($moduleIds as $moduleId) {
                $isCompleted = in_array($moduleId, $completedModules);
                $score = $request->input("module_scores.{$moduleId}");
                
                ModuleProgress::updateOrCreate(
                    ['user_id' => $user->id, 'module_id' => $moduleId],
                    [
                        'completed' => $isCompleted,
                        'score' => $score,
                    ]
                );
            }
        }
        
        // Update module_scores individually
        if ($request->has('module_scores')) {
            $moduleScores = $request->input('module_scores', []);
            
            foreach ($moduleScores as $moduleId => $score) {
                ModuleProgress::updateOrCreate(
                    ['user_id' => $user->id, 'module_id' => $moduleId],
                    [
                        'score' => $score,
                    ]
                );
            }
        }
        
        // Update current_module_id in a special record (module_id = 0)
        if ($request->has('current_module_id')) {
            ModuleProgress::updateOrCreate(
                ['user_id' => $user->id, 'module_id' => 0],
                ['current_module_id' => $request->input('current_module_id')]
            );
        }
        
        // Fetch and return updated progress
        $progressRecords = ModuleProgress::where('user_id', $user->id)
            ->orderBy('module_id')
            ->get();
        
        $completedModules = [];
        $moduleScores = [];
        $currentModuleId = 1;
        
        foreach ($progressRecords as $record) {
            if ($record->module_id == 0) {
                $currentModuleId = $record->current_module_id ?? 1;
                continue;
            }
            
            if ($record->completed) {
                $completedModules[] = (int)$record->module_id;
            }
            
            if ($record->score !== null) {
                $moduleScores[$record->module_id] = (int)$record->score;
            }
        }

        return response()->json([
            'message' => 'Progress updated successfully',
            'progress' => [
                'completed_modules' => $completedModules,
                'module_scores' => $moduleScores,
                'current_module_id' => $currentModuleId,
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
