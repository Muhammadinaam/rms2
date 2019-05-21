<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItemOption extends Model
{
    use UsesUuid;

    protected $table = 'order_items_options';

    public function options_items()
    {
        return $this->hasMany('App\OrderItemOptionItem');
    }
}
