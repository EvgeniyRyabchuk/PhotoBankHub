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
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('full_name', 300);
            $table->string('avatar', 4096);

            $table->string('about', 3000)->nullable();
            $table->string('website', 255)->nullable();

            $table->foreignId('phone_id')
                ->nullable()
                ->constrained('phones')
                ->onUpdate('cascade')
                ->onDelete('cascade');


            $table->foreignId('role_id')
                ->constrained('roles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('email', 320)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};