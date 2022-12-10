<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    use HasFactory;

    public function image() {
        return $this->belongsTo(Image::class);
    }

    public function size() {
        return $this->belongsTo(Size::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }
}
