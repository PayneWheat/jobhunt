<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $fillable = [
        'at_time', 
        'application_id', 
        'interview_type_id',  
        'street_address1', 
        'street_address2', 
        'location_id',
        'zip_code'
    ];

    public function application() 
    {
        return $this->belongsTo('App\Models\Application');
    }

    public function notes()
    {
        return $this->morphOne('App\Models\Note', 'notable');
    }

    public function interview_type()
    {
        return $this->belongsTo('App\Models\InterviewType');
    }
}
