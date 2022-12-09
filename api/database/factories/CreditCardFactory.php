<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CreditCard>
 */
class CreditCardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'number' => fake()->creditCardNumber,
            'expire_month' => fake()->month,
            'expire_year' => Carbon::now()->addYear(rand(1, 4))->year,
            'cvc' => rand(100, 999),
            'issuer' => fake()->creditCardType,
            'client_id' => 1
        ];
    }
}
