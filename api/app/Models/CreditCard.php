<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'expire_month',
        'expire_yea',
        'cvc',
        'issue',
        "client_id"
    ];

    public function client() {
        return $this->belongsTo(Client::class);
    }
}
