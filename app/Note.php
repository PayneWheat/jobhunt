<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['note', 'system_flag'];
    public function application()
    {
        return $this->belongsTo('App\Application');
    }
}
