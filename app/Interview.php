<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $fillable = ['at_time'];
    public function application() {
        return $this->belongsTo('App\Application');
    }
    public function notes()
    {
        return $this->morphOne('App\Note', 'notable');
    }
    public function interview_type()
    {
        return $this->belongsTo('App\InterviewType');
    }
}
