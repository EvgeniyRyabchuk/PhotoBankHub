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
        Schema::create('billing_infos', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 300);
            $table->string('email', 320);
            $table->string('country', 90)->nullable();
            $table->string('city', 189)->nullable();
            $table->string('street')->nullable();
            $table->string('companyName', 300)->nullable();
            $table->unsignedInteger('zipCode')->nullable();
            $table->string('phone_number', 15)->nullable();

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
        Schema::dropIfExists('billing_infos');
    }
};
