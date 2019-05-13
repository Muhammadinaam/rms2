<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use UsesUuid;

    protected $table = 'orders';

    public function order_status()
    {
        return $this->belongsTo('App\OrderStatus', 'order_status_id');
    }
}
