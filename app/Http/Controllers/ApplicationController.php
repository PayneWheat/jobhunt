<?php

namespace App\Http\Controllers;
use App\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::all();
        return $applications->toJson();
    }

    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'position' => 'required',
            'company_id' => 'required',
            'location_id' => 'required',
        ]);

        // add file uploading for resume pdfs
        $application = Application::create([
            'position' => $validatedData['position'],
            'company_id' => $validatedData['company_id'],
            'location_id' => $validatedData['location_id'],
            'application_status_id' => 1
        ]);
        return response()->json('Application created');
    }

    public function show($id)
    {
        return Application::findOrFail($id)->toJson();
    }

    public function update($application)
    {
        // update application
        $validatedData = $request->validate([
            'position' => 'required',
            'company_id' => 'required',
            'location_id' => 'required',
        ]);

        // add file uploading for resume pdfs
        $application->position = $validatedData['position'];
        $application->application_status_id = $validatedData['status'];
        $application->location_id = $validatedData['location_id'];
        $application->update();
        
        return response()->json('Application updated');
        
    }
}
