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

            $table->foreignId('photo_model_id')
                ->nullable()
                ->constrained('photo_models')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('category_id')->constrained('categories')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('creator_id')->constrained('creators')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('collection_id')
                ->nullable()
                ->constrained('collections')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('image_load_status_id')
                ->nullable()
                ->constrained('image_load_statuses')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->boolean('isEditorsChoice')->default(false);

            $table->boolean('isFree')->default(false);

            $table->string('preview', 4096)
                ->default('/static/gallery_preview.jpeg');
            $table->string('original', 4096)
                ->default('/static/gallery_preview.jpeg');
            $table->string('originalExt', 255);
            $table->string('temp', 4096)->nullable();

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
