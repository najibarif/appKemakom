<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('module_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('module_id');
            $table->boolean('completed')->default(false);
            $table->integer('score')->nullable();
            $table->json('completed_modules')->nullable(); // Array of completed module IDs
            $table->json('module_scores')->nullable(); // Object with module_id => score
            $table->integer('current_module_id')->default(1);
            $table->timestamps();
            
            $table->unique(['user_id', 'module_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module_progress');
    }
};
