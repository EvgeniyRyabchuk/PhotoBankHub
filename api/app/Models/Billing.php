<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    use HasFactory;

    public function billStatus() {
        return $this->belongsTo(BillStatus::class);
    }

    public function plan() {
        return $this->belongsTo(Plan::class);
    }

    public function billingInfo() {
        return $this->belongsTo(BillingInfo::class);
    }

    public function client() {
        return $this->belongsTo(Client::class);
    }


}
