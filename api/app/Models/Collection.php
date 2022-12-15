<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    public function creator() {
        return $this->belongsTo(Creator::class);
    }

    public function images() {
        return $this->hasMany(Image::class);
    }
}
