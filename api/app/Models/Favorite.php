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

    public function client() {
        return $this->belongsTo(Client::class);
    }

}
