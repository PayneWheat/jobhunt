<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'address'];
    public function notes()
    {
        return $this->morphOne('App\Note', 'notable');
    }
}
