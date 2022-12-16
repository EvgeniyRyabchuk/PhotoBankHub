<?php

namespace App\_Sl;

use Illuminate\Support\Facades\DB;

class _Utills {

    public static function getNextId($model) {
        $statement = DB::select("SHOW TABLE STATUS LIKE '$model'");
        $nextId = $statement[0]->Auto_increment;
        return $nextId;
    }

    public static function getModelByTableName($tableName) {
        $folderName = 'App\\Models';
        $name =  $folderName . '\\' . Str::studly(strtolower(STR::singular($tableName)));

        $clearStr = str_replace('"', "", $name);
        $_class = new $clearStr();
        return $_class;
    }


    public static function last4Number($number) {
        return mb_substr($number, strlen($number) - 4, strlen($number) - 1);
    }

    public static function isDecimal($val) {
        return is_numeric( $val ) && floor( $val ) != $val;
    }
}
