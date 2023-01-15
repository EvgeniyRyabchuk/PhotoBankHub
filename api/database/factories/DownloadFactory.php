<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Image;
use App\Models\ImageVariant;
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


        $image = Image::inRandomOrder()->first();


        $level = $client->plan->access_level;
        $imageSize = Size::where('min_access_level', '>=', $level)->inRandomOrder()->first();
        $randVariant = ImageVariant::where(['image_id' => $image->id, 'size_id' => $imageSize->id])->first();


        $client->left_image_count = $client->left_image_count - 1;
        $client->save();

        return [
            'image_id' => $image->id,
            'client_id' => $client->id,
            'image_variant_id' => $randVariant->id,
            'created_at' => Carbon::now()
        ];
    }
}
