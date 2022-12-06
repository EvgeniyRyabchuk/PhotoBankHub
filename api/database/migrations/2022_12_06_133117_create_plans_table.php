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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name', 300);
            $table->foreignId('license_id')->constrained('licenses')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('description', 500);
            $table->unsignedBigInteger('image_count');
            $table->decimal('amount', 9, 2);
            $table->string('valid_period_type')->default('monthly'); // monthly or annually
            $table->unsignedTinyInteger('access_level');
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
        Schema::dropIfExists('plans');
    }
};
