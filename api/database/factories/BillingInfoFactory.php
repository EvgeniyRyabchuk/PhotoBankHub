<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingInfo>
 */
class BillingInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'full_name' => fake()->name,
            'email' => fake()->email,
            'country' => fake()->country,
            'city' => fake()->city,
            'street' => fake()->streetAddress,
            'companyName' => fake()->company,
            'zipCode' => fake()->numberBetween(10000, 99999),
            'phone_number' => mb_substr(fake()->e164PhoneNumber, 1),
        ];
    }
}
