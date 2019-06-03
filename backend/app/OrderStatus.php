<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    protected $table = 'order_statuses';
    public $timestamps = false;

    public static function getIdByIdt($idt){
        $id = null;
        $status = (new static)::where('idt', $idt)->first();
        if($status != null){
            $id = $status->id;
        }

        return $id;
    }
}
