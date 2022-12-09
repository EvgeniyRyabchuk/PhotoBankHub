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
        Schema::create('license_plan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('plan_id')->constrained('plans')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('license_id')->constrained('licenses')
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
        Schema::dropIfExists('license_plan');
    }
};
