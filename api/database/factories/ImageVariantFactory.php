<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ImageVariant>
 */
class ImageVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {



        return [
            'image_id' => fake()->sentence,
            'size_id' => fake()->sentence,
            'extension' => fake()->sentence,
            'weights' => fake()->sentence,
            'width' => fake()->sentence,
            'height' => fake()->sentence,
            'path' => fake()->sentence,
        ];
    }
}
