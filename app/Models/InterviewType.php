<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InterviewType extends Model
{
    protected $fillable = ['type'];
    public function interview() {
        return $this->hasMany('App\Models\Interview');
    }
}
