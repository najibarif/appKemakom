<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ModuleProgress extends Model
{
    protected $fillable = [
        'user_id',
        'module_id',
        'completed',
        'score',
        'completed_modules',
        'module_scores',
        'current_module_id',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completed_modules' => 'array',
        'module_scores' => 'array',
    ];

    /**
     * Get the user that owns the progress.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
