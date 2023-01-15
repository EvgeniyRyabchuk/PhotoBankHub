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

    public function subscribes() {
        return $this->belongsToMany(
        Client::class,
        'content_subscriptions',
'creator_id',
'client_id'
        );
    }

    public function totalDownloads() {
        return $this->hasManyThrough(
            Download::class,
            Image::class,
            'creator_id',
            'image_id',
            'id',
            'id'
        );
    }

    public function totalLikes() {
        return $this->hasManyThrough(
            Like::class,
            Image::class,
            'creator_id',
            'image_id',
            'id',
            'id'
        );
    }

    public function totalViews() {
        return $this->hasManyThrough(
            View::class,
            Image::class,
            'creator_id',
            'image_id',
            'id',
            'id'
        );
    }
}
