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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('name', 300);

            $table->foreignId('image_orientation_id')->constrained('image_orientations')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('model_id')->constrained('models')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('category_id')->constrained('categories')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('creator_id')->constrained('creators')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('collection_id')->constrained('creators')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->boolean('isEditorsChoice')->default(false);

            $table->boolean('isFree')->default(false);

            $table->string('preview', 4096);

            $table->unsignedTinyInteger('people_count')->default(0);








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
        Schema::dropIfExists('images');
    }
};