<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['city', 'state'];
    
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
    
    // add info on cost of living, avg rent, avg salary, etc?
}
