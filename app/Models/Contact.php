<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'address', 'company_id'];

    public function notes()
    {
        return $this->morphOne('App\Models\Note', 'notable');
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company');
    }
}
