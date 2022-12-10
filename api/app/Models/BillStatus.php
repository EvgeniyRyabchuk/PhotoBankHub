<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillStatus extends Model
{
    use HasFactory;

    public function billing() {
        return $this->hasMany(Billing::class);
    }
}
