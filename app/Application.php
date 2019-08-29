<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['resume', 'position', 'status', 'job_description', 'resume_text', 'coverletter_text'];
    // location relationship defined in location
    // company relationship in company
    public function notes()
    {
        return $this->morphOne('App\Note', 'notable');
    }
    public function location()
    {
        return $this->hasOne(Location::class);
    }
    public function status()
    {
        return $this->hasOne(ApplicationStatus::class);
    }
}
