<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function options()
    {
        return $this->hasMany('App\Option');
    }

    public function items()
    {
        return $this->hasMany('App\Item');
    }
}
