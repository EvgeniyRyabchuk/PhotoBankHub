<?php

namespace App\Models;

use Database\Seeders\ImageVariantSeeder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;

    public function images() {
        return $this->hasMany(ImageVariant::class);
    }
}
