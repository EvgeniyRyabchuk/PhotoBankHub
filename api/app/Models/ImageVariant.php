<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_id' ,
        'size_id' ,
        'extension',
        'size_in_byte' ,
        'width',
        'height',
        'path',
    ];

    public function image() {
        return $this->belongsTo(Image::class);
    }

    public function size() {
        return $this->belongsTo(Size::class);
    }
}
