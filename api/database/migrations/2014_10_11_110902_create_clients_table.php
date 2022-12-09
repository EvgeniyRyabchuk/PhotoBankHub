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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('billing_info_id')
                ->nullable()
                ->constrained('billing_infos')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('plan_id')
                ->nullable()
                ->constrained('plans')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->dateTime('plan_expired_at')->nullable();

            $table->unsignedBigInteger('left_image_count')->default(0);

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
        Schema::dropIfExists('clients');
    }
};
