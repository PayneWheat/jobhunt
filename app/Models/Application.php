<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['resume', 'position', 'status_id', 'job_description', 'resume_text', 'coverletter_text', 'post_age', 'company_id', 'location_id'];
    // location relationship defined in location
    // company relationship in company
    public function location()
    {
        return $this->belongsTo('App\Models\Location');
    }

    public function status()
    {
        return $this->belongsTo('App\Models\ApplicationStatus');
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company');
    }

    public function interviews()
    {
        return $this->hasMany('App\Models\Interview');
    }
    
    public function notes()
    {
        return $this->hasMany('App\Models\Note');
    }
}
