<?php

namespace App\Http\Controllers;
use App\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::all();
        $applications->load('company', 'location', 'status');
        return $applications->toJson();
        //return $applications->toArray();
    }

    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'position' => 'required',
            'company_id' => 'required',
            'location_id' => 'required',
            'job_description' => 'nullable',
            'resume_text' => 'nullable',
            'coverletter_text' => 'nullable',
            'post_age' => 'nullable'
        ]);

        // add file uploading for resume pdfs
        $application = Application::create([
            'position' => $validatedData['position'],
            'company_id' => $validatedData['company_id'],
            'location_id' => $validatedData['location_id'],
            'job_description' => $validatedData['job_description'],
            'resume_text' => $validatedData['resume_text'],
            'coverletter_text' => $validatedData['coverletter_text'],
            'post_age' => $validatedData['post_age'],
            'status_id' => 1
        ]);
        return response()->json($application);
    }

    public function show($id)
    {
        $application = Application::find($id);
        $application->load('company', 'location', 'status');
        return $application->toJson();
    }

    public function update($application)
    {
        // update application
        $validatedData = $request->validate([
            'position' => 'required',
            'company_id' => 'required',
            'location_id' => 'required',
            'job_description' => 'nullable',
            'resume_text' => 'nullable',
            'coverletter_text' => 'nullable'
        ]);

        // add file uploading for resume pdfs
        $application->position = $validatedData['position'];
        $application->application_status_id = $validatedData['status'];
        $application->location_id = $validatedData['location_id'];
        $application->job_description = $validatedData['job_description'];
        $application->resume_text = $validatedData['resume_text'];
        $application->coverletter_text = $validatedData['coverletter_text'];
        $application->update();
        
        return response()->json('Application updated');
        
    }
}
