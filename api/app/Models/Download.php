<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    use HasFactory;


    protected $fillable = [
        'client_id',
        'image_id',
        'image_variant_id',
        'updated_at'
    ];


    public function image() {
        return $this->belongsTo(Image::class);
    }

    public function imageVariant() {
        return $this->belongsTo(ImageVariant::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }
}
