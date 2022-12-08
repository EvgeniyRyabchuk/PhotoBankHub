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
        Schema::create('image_orientations', function (Blueprint $table) {
            $table->id();
            $table->string('name', 300);
            $table->unsignedDecimal('ratio_side_1', 4);
            $table->unsignedDecimal('ratio_side_2', 4);
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
        Schema::dropIfExists('image_orientations');
    }
};
