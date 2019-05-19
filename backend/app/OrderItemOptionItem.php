<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItemOptionItem extends Model
{
    use UsesUuid;

    protected $table = 'order_items_options_items';
}
