<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $fillable = ['at_time', 'application_id', 'interview_type_id'];
    public function notes()
    {
        return $this->morphOne('App\Note', 'notable');
    }
    public function type()
    {
        return $this->hasOne(InterviewType::class);
    }

}
