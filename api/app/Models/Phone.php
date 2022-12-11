<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone_number',
        'countryCode',
        'name',
        'dialCode',
        'format',
    ];

    public function user() {
        return $this->hasOne(User::class);
    }
}
