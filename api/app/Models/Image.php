<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    public function creator() {
        return $this->belongsTo(Creator::class);
    }

    public function photoModel() {
        return $this->belongsTo(PhotoModel::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function favorites() {
        return $this->belongsToMany(Favorite::class);
    }

}
