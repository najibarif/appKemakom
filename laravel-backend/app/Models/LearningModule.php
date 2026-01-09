<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content',
        'simulation_code',
        'quiz',
        'duration',
        'order',
        'is_active',
    ];

    protected $casts = [
        'quiz' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
