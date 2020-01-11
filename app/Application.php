<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['resume', 'position', 'status_id', 'job_description', 'resume_text', 'coverletter_text', 'post_age', 'company_id', 'location_id'];
    // location relationship defined in location
    // company relationship in company
    public function location()
    {
        return $this->belongsTo('App\Location');
    }
    public function status()
    {
        return $this->belongsTo('App\ApplicationStatus');
    }
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
    public function interviews()
    {
        return $this->hasMany('App\Interview');
    }
    public function notes()
    {
        return $this->hasMany('App\Note');
    }
}
