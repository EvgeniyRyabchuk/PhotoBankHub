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
        Schema::create('photo_models', function (Blueprint $table) {
            $table->id();
            $table->string('avatar', 4096)
                ->default('static/avatars/default_avatar.png');

            $table->string('full_name', 300);
            $table->unsignedTinyInteger('age');
            $table->string('gender')->default('male');
            $table->string('ethnicity', 100);

            $table->foreignId('created_by_creator_id')
                ->nullable()
                ->constrained("creators")
                ->cascadeOnUpdate()
                ->nullOnDelete();

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
        Schema::dropIfExists('photo_models');
    }
};
