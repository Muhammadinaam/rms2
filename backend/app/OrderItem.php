<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use UsesUuid;

    public function options()
    {
        return $this->hasMany('App\OrderItemOption', 'order_item_id');
    }
}
