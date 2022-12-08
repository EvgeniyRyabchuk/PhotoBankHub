<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('favorite_image', function (Blueprint $table) {
            $table->id();

            $table->foreignId('image_id')->constrained('images')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('favorite_id')->constrained('favorites')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('favorite_image');
    }
};
