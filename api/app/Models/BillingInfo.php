<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingInfo extends Model
{
    use HasFactory;

    public function client() {
        return $this->hasOne(Client::class);
    }

    public function billing() {
        return $this->hasMany(Billing::class);
    }

}
