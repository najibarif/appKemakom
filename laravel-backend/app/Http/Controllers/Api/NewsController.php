<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::orderBy('date', 'desc')->get();
        
        return response()->json([
            'data' => $news
        ]);
    }

    public function show(News $news)
    {
        return response()->json([
            'data' => $news
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|string',
            'date' => 'required|date',
        ]);

        $news = News::create($request->all());

        return response()->json([
            'data' => $news
        ], 201);
    }

    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'image' => 'sometimes|string',
            'date' => 'sometimes|date',
        ]);

        $news->update($request->all());

        return response()->json([
            'data' => $news
        ]);
    }

    public function destroy(News $news)
    {
        $news->delete();

        return response()->json([
            'message' => 'News deleted successfully'
        ]);
    }

    public function incrementViews(News $news)
    {
        $news->increment('views');

        return response()->json([
            'message' => 'Views incremented'
        ]);
    }
}