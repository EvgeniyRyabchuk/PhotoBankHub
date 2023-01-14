<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id'
    ];


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function plan() {
        return $this->belongsTo(Plan::class);
    }

    public function creditCard() {
        return $this->hasOne(CreditCard::class);
    }

    public function billingInfo() {
        return $this->belongsTo(BillingInfo::class);
    }

    public function contentSubscriptions() {
        return $this->belongsToMany(
            Creator::class, 'content_subscriptions',
            'client_id', 'creator_id');
    }

    public function billing() {
        return $this->hasMany(Billing::class);
    }


    public function downloads() {
        return $this->hasMany(Download::class);
    }

    public function favorites() {
        return $this->hasMany(Favorite::class);
    }

    public function views() {
        return $this->hasMany(View::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

}
