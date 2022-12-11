<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Image;
use App\Models\Size;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Download>
 */
class DownloadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $client = Client::where('plan_expired_at', '>=', Carbon::now())
            ->has('plan')
            ->inRandomOrder()
            ->first();


        $image = Image::inRandomOrder()->where('isFree', false)->first();

        $level = $client->plan->access_level;
        $imageSize = Size::where('min_access_level', '>=', $level)->inRandomOrder()->first();

        $client->left_image_count = $client->left_image_count - 1;
        $client->save();

        return [
            'image_id' => $image->id,
            'client_id' => $client->id,
            'size_id' => $imageSize->id,
            'created_at' => Carbon::now()
        ];
    }
}
