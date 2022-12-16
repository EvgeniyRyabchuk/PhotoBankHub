<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    use HasFactory;

    protected $fillable = [
        "plan_id",
        "bill_status_id" ,
        "billing_info_id" ,
        "client_id" ,
        "last_card_number",
        "valid_period_type",
        "issuer",
    ];

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
