<?php

namespace Database\Factories;

use App\Models\Creator;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Collection>
 */
class CollectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $randCreator = Creator::inRandomOrder()->first();

        return [
            'name' => fake()->sentence,
            'description' => fake()->sentence(10),
            'backgroundImg' => null,
            'creator_id' => $randCreator->id
        ];
    }
}
