<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Timeline;
use Illuminate\Http\Request;

class TimelineController extends Controller
{
    public function index()
    {
        $timeline = Timeline::orderBy('year', 'asc')->get();
        
        return response()->json([
            'data' => $timeline
        ]);
    }

    public function show(Timeline $timeline)
    {
        return response()->json([
            'data' => $timeline
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|string|max:4',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string|in:building,users,award,calendar',
        ]);

        $timeline = Timeline::create($request->all());

        return response()->json([
            'data' => $timeline
        ], 201);
    }

    public function update(Request $request, Timeline $timeline)
    {
        $request->validate([
            'year' => 'sometimes|string|max:4',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'icon' => 'sometimes|string|in:building,users,award,calendar',
        ]);

        $timeline->update($request->all());

        return response()->json([
            'data' => $timeline
        ]);
    }

    public function destroy(Timeline $timeline)
    {
        $timeline->delete();

        return response()->json([
            'message' => 'Timeline deleted successfully'
        ]);
    }
}