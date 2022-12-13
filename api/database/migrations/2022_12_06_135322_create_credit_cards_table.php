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
        Schema::create('credit_cards', function (Blueprint $table) {
            $table->id();
            $table->string('number', 19);

            $table->foreignId('client_id')->constrained('clients')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->string('expire_month', 2);
            $table->string('expire_year', 4);
            $table->string('cvc', 4);
            $table->string('issuer', 300);
            $table->string('isMain')->default(true);

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
        Schema::dropIfExists('credit_cards');
    }
};
