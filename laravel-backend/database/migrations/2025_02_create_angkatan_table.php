<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('angkatan', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->integer('total');
            $table->integer('active');
            $table->json('achievements');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('angkatan');
    }
};