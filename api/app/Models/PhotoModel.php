<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhotoModel extends Model
{
    use HasFactory;

    public function images() {
        return $this->hasMany(Image::class);
    }


    public function creator() {
        return $this->belongsTo(
            Creator::class,
            'created_by_creator_id',
            'id'
        );
    }


}
