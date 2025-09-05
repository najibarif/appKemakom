<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Angkatan extends Model
{
    use HasFactory;

    protected $table = 'angkatan';

    protected $fillable = [
        'year',
        'total',
        'active',
        'achievements'
    ];

    protected $casts = [
        'achievements' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}