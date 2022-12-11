<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Creator extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function collections() {
        return $this->hasMany(Collection::class);
    }

    public function images() {
        return $this->hasMany(Image::class);
    }
}
