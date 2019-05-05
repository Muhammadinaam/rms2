<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use App\UsesUuid;

    protected $table = 'orders';
}
