<?php

namespace App\_Sl;

use Illuminate\Support\Facades\DB;

class _Utills {

    public static function getNextId($model) {
        $statement = DB::select("SHOW TABLE STATUS LIKE '$model'");
        $nextId = $statement[0]->Auto_increment;
        return $nextId;
    }
}
