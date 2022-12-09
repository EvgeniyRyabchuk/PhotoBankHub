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
        Schema::create('billings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('plan_id')->constrained('plans')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('bill_status_id')->constrained('bill_statuses')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('billing_info_id')->constrained('billing_infos')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('client_id')->constrained('clients')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->unsignedSmallInteger('last_card_number')
                ->nullable();

            $table->string('valid_period_type')
                ->default('monthly'); // monthly or annually

            $table->string('issuer', 300)->nullable();
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
        Schema::dropIfExists('billings');
    }
};
