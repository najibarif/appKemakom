<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('timeline', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->string('title');
            $table->text('description');
            $table->string('icon'); // building, users, award, calendar
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('timeline');
    }
};