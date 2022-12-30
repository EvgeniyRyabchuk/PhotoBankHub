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

    public function imageVariants() {
        return $this->hasMany(ImageVariant::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function favorites() {
        return $this->belongsToMany(Favorite::class);
    }

    public function collection() {
        return $this->belongsTo(Collection::class);
    }

    public function imageOrientation() {
        return $this->belongsTo(ImageOrientation::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function imageLoadStatus() {
        return $this->belongsTo(ImageLoadStatus::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function views() {
        return $this->hasMany(View::class);
    }

    public function downloads() {
        return $this->hasMany(Download::class);
    }
}
