<?php

namespace App\Http\Controllers;
use App\Models\Application;
use App\Models\ApplicationStatus;
use App\Models\Interview;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    private $rules = [
        'user_id'                   => 'required',
        'position'                  => 'required',
        'company_id'                => 'required',
        'location_id'               => 'required',
        'app_zip'                   => 'nullable',
        'job_description'           => 'nullable',
        'resume_text'               => 'nullable',
        'coverletter_text'          => 'nullable',
        'post_age'                  => 'nullable',
        'posted_salary_max'         => 'nullable',
        'posted_salary_min'         => 'nullable',
        'requested_salary'          => 'nullable',
        'workspace'                 => 'required',
        'employment_classification' => 'nullable',
        'pay_rate_type'             => 'required'
    ];

    public function index(Request $request)
    {
        if(!($userId = $request->header('x-user-id'))) {
            return response()->json(['errors' => 'Missing user ID'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $applications = Application::where('user_id', $userId)->orderBy('created_at', 'desc')->get();
        $applications->load('company', 'location', 'status');

        return $applications->toJson();
    }

    public function store(Request $request) 
    {
        $validatedData = $request->validate($this->rules);

        $application = Application::create(array_merge(
            $validatedData, ['status_id' => 1]
        ));

        return response()->json($application);
    }

    public function show($id)
    {
        $application = Application::find($id);
        $application->load('company', 'location', 'status', 'notes', 'company.contacts', 'interviews', 'interviews.interview_type');

        return $application->toJson();
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate($this->rules);
        Application::findOrFail($id)->update($validatedData);

        return response()->json(['id' => $id]);
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
