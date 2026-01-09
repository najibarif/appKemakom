<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AlumniController;
use App\Http\Controllers\Api\AngkatanController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TimelineController;
use App\Http\Controllers\Api\ModuleProgressController;
use App\Http\Controllers\Api\LearningModuleController;

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Public data routes (read-only)
Route::get('/alumni', [AlumniController::class, 'index']);
Route::get('/angkatan', [AngkatanController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('/learning-modules', [LearningModuleController::class, 'index']);
Route::get('/contacts', [ContactController::class, 'index']);
Route::get('/timeline', [TimelineController::class, 'index']);

// Increment counters (public)
Route::post('/news/{news}/view', [NewsController::class, 'incrementViews']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    Route::post('/auth/profile', [AuthController::class, 'updateProfile']); // Alternative for FormData
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
    
    // Module Progress routes
    Route::get('/module-progress', [ModuleProgressController::class, 'index']);
    Route::put('/module-progress', [ModuleProgressController::class, 'update']);
    Route::put('/module-progress/{moduleId}', [ModuleProgressController::class, 'updateModule']);
    
    // Alumni management
    Route::get('/alumni/{alumni}', [AlumniController::class, 'show']);
    Route::post('/alumni', [AlumniController::class, 'store']);
    Route::put('/alumni/{alumni}', [AlumniController::class, 'update']);
    Route::delete('/alumni/{alumni}', [AlumniController::class, 'destroy']);
    
    // Angkatan management
    Route::get('/angkatan/{angkatan}', [AngkatanController::class, 'show']);
    Route::post('/angkatan', [AngkatanController::class, 'store']);
    Route::put('/angkatan/{angkatan}', [AngkatanController::class, 'update']);
    Route::delete('/angkatan/{angkatan}', [AngkatanController::class, 'destroy']);
    
    // News management
    Route::get('/news/{news}', [NewsController::class, 'show']);
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{news}', [NewsController::class, 'update']);
    Route::delete('/news/{news}', [NewsController::class, 'destroy']);
    
    // Learning Module management
    Route::get('/learning-modules/{learningModule}', [LearningModuleController::class, 'show']);
    Route::post('/learning-modules', [LearningModuleController::class, 'store']);
    Route::put('/learning-modules/{learningModule}', [LearningModuleController::class, 'update']);
    Route::delete('/learning-modules/{learningModule}', [LearningModuleController::class, 'destroy']);
    
    // Contact management
    Route::get('/contacts/{contact}', [ContactController::class, 'show']);
    Route::post('/contacts', [ContactController::class, 'store']);
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);
    
    // Timeline management
    Route::get('/timeline/{timeline}', [TimelineController::class, 'show']);
    Route::post('/timeline', [TimelineController::class, 'store']);
    Route::put('/timeline/{timeline}', [TimelineController::class, 'update']);
    Route::delete('/timeline/{timeline}', [TimelineController::class, 'destroy']);
});