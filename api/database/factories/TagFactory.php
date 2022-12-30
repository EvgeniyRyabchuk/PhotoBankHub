<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\_Sl\_Utills;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
//        $models = ['images', 'creators'];
//        $randModel = $models[rand(0, 1)];
//        $class = _Utills::getModelByTableName($randModel);
//
//        dd($class);

        return [
            'name' => fake()->sentence(1),
        ];
    }
}
