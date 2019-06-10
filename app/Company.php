<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = ['name', 'hq_location', 'phone', 'website'];
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }
    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
    public function notes()
    {
        return $this->morphOne('App\Note', 'notable');
    }

}
