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
        Schema::create('image_variants', function (Blueprint $table) {
            $table->id();

            $table->foreignId('image_id')->constrained('images')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('size_id')->constrained('sizes')
                ->onUpdate('cascade')->onDelete('cascade');


            $table->string('extension', 255);

            $table->unsignedBigInteger('weights');
            $table->unsignedInteger('width');
            $table->unsignedInteger('height');

            $table->string('path', 4096);


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
        Schema::dropIfExists('image_variants');
    }
};
