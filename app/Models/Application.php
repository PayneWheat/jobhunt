<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'resume', 
        'position', 
        'status_id', 
        'job_description', 
        'resume_text', 
        'coverletter_text', 
        'post_age', 
        'company_id', 
        'location_id',
        'app_zip',
        'user_id',
        'posted_salary_max',
        'posted_salary_min',
        'requested_salary'
    ];

    protected $casts = [
        'posted_salary_max' => 'integer',
        'posted_salary_min' => 'integer',
        'requested_salary'  => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function status()
    {
        return $this->belongsTo(ApplicationStatus::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }
    
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
