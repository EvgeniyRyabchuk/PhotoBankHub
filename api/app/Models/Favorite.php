<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    public function images() {
        return $this->belongsToMany(Image::class);
    }

    public function imageIds() {
        return $this->belongsToMany(
            Image::class,
            'favorite_image',
    'favorite_id',
    'image_id')
            ->select('image_id');
    }

    public function lastImage() {
        return $this->belongsToMany(Image::class)
            ->orderBy('created_at', 'desc')
            ->take(1);

    }


    public function client() {
        return $this->belongsTo(Client::class);
    }

}
