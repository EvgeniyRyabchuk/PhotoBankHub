<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'verification_type',
        'token',
        'expired_at',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

}
