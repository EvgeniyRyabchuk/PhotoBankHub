<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    public function image() {
        return $this->belongsTo(Image::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }


}
