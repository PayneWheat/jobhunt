<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $fillable = ['position', 'at_time'];
    public function notes()
    {
        return $this->morphOne('App\Note', 'notable');
    }
    public function type()
    {
        return $this->hasOne(InterviewType::class);
    }

}
