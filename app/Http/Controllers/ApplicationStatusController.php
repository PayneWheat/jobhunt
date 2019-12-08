<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ApplicationStatus;
class ApplicationStatusController extends Controller
{
    public function index()
    {
        $applicationStatuses = ApplicationStatus::all();
        return $applicationStatuses->toJson();
    }
    public function store()
    {
        // make sure the statuses are unique
    }
}
