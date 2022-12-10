<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    public function planFeatures() {
        return $this->belongsToMany(PlanFeature::class);
    }

    public function licenses() {
        return $this->belongsToMany(License::class);
    }

    public function clients() {
        return $this->hasMany(Client::class);
    }

    public function billing() {
        return $this->hasMany(BillStatus::class);
    }

}
