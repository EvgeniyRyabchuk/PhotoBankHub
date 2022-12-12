<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageOrientation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ratio_side_1',
        'ratio_side_2',
    ];

    public function images() {
        return $this->hasMany(Image::class);
    }

}
