<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\View>
 */
class ViewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $image = Image::inRandomOrder()->first();
        $client = Client::inRandomOrder()->first();

        return [
            'image_id' => $image->id,
            'ip' => fake()->ipv4,
            'client_id' => $client->id,
        ];
    }
}
