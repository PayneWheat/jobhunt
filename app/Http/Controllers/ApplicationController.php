<?php

namespace App\Http\Controllers;
use App\Models\Application;
use App\Models\ApplicationStatus;
use App\Models\Interview;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        if(!($userId = $request->header('x-user-id'))) {
            return response()->json(['errors' => 'Missing user ID'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        \Log::alert("ApplicationController::index\n" . print_r($request->headers, true));
        $applications = Application::where('user_id', $userId)->orderBy('created_at', 'desc')->get();
        // $applications = Application::orderBy('created_at', 'desc')->get();
        $applications->load('company', 'location', 'status');
        return $applications->toJson();
    }

    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'user_id'          => 'required',
            'position'         => 'required',
            'company_id'       => 'required',
            'location_id'      => 'required',
            'job_description'  => 'nullable',
            'resume_text'      => 'nullable',
            'coverletter_text' => 'nullable',
            'post_age'         => 'nullable'
        ]);

        // add file uploading for resume pdfs
        $application = Application::create([
            'user_id'          => $validatedData['user_id'],
            'position'         => $validatedData['position'],
            'company_id'       => $validatedData['company_id'],
            'location_id'      => $validatedData['location_id'],
            'job_description'  => $validatedData['job_description'],
            'resume_text'      => $validatedData['resume_text'],
            'coverletter_text' => $validatedData['coverletter_text'],
            'post_age'         => $validatedData['post_age'],
            'status_id'        => 1
        ]);
        return response()->json($application);
    }

    public function show($id)
    {
        $application = Application::find($id);
        $application->load('company', 'location', 'status', 'notes', 'company.contacts', 'interviews', 'interviews.interview_type');
        //$application = Application::with('company')->get();
        return $application->toJson();
    }

    public function update(Request $request, $id)
    {
        // update application
        $validatedData = $request->validate([
            'user_id' => 'required',
            'position' => 'required',
            'company_id' => 'required',
            'location_id' => 'required',
            'job_description' => 'nullable',
            'resume_text' => 'nullable',
            'coverletter_text' => 'nullable',
            'applied_at' => 'nullable'
        ]);

        $application = Application::find($id);
        // add file uploading for resume pdfs
        $application->position = $validatedData['position'];
        //$application->application_status_id = $validatedData['status'];
        $application->location_id = $validatedData['location_id'];
        $application->job_description = $validatedData['job_description'];
        $application->resume_text = $validatedData['resume_text'];
        $application->coverletter_text = $validatedData['coverletter_text'];
        
        //@TODO clean this up. not sure why it's necessary. applied_at shouldn't be edited in the form.
        if (isset($validatedData['applied_at'])) {
            $application->applied_at = $validatedData['applied_at'];
        }

        $application->update();
        
        return response()->json($application);
        
    }

    public function updateStatus($appId, $statusId)
    {
        $application = Application::find($appId);
        $newStatus = ApplicationStatus::find($statusId);
        if($application && $newStatus) {
            $application->status_id = $statusId;
            if($newStatus->status == "Sent") {
                $application->applied_at = date('Y-m-d');
            }
            $application->update();
        } 
    }

    public function interviews($id)
    {
        $interviews = Interview::where('application_id', '=', $id)->get();
        $interviews->load('application', 'application.company', 'interview_type');
        return $interviews->toJson();
    }
}
