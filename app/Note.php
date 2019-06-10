<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['note'];
    public function notable()
    {
        return $this->morphTo();
    }
}
