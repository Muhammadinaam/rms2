<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    public function options_items()
    {
        return $this->hasMany('App\OptionItem');
    }
}
