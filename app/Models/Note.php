<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['note', 'system_flag', 'application_id'];
    public function application()
    {
        return $this->belongsTo('App\Models\Application');
    }
}
