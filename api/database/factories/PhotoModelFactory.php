<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PhotoModel>
 */
class PhotoModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $genders = ['male', 'female'];
        $ethnicity = ['Asian', 'African American', 'Hispanic', 'Multi-Racial', 'European/White', 'Other'];


        return [
            'full_name' => fake()->name,
            'age' => fake()->numberBetween(3, 80),
            'gender' => $genders[rand(0, 1)],
            'ethnicity' => $ethnicity[rand(0, count($ethnicity) - 1)]
        ];
    }
}
