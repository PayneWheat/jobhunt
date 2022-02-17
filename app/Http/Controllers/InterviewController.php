<?php

namespace App\Http\Controllers;
use App\Models\Interview;
use Illuminate\Http\Request;

class InterviewController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->header('x-user-id');
        $interviews = Interview::where('user_id', $userId)->get();
        $interviews->load('application', 'application.company', 'interview_type');

        return $interviews->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id'           => 'required',
            'at_time'           => 'required|date',
            'application_id'    => 'required',
            'interview_type_id' => 'required',
            'location_id'       => 'sometimes'
        ]);

        $interview = Interview::create([
            'user_id'           => $validatedData['user_id'],
            'at_time'           => $validatedData['at_time'],
            'application_id'    => $validatedData['application_id'],
            'interview_type_id' => $validatedData['interview_type_id'],
            'location_id'       => $validatedData['location_id'] ?? null
        ]);

        return response()->json($interview);
    }

    public function show($id)
    {
        $interview = Interview::findOrFail($id);
        $interview->load('application', 'application.company', 'interview_type');
        return $interview->toJson();
    }

    public function update($interview)
    {
        $validatedData = $request->validate([
            'at_time'           => 'required|date',
            'application_id'    => 'required|integer',
            'interview_type_id' => 'required|integer',
            'location_id'       => 'sometimes|integer'
        ]);

        $interview->at_time = $validatedData['at_time'];
        $interview->company_id = $validatedData['application_id'];
        $interview->interview_type_id = $validatedData['interview_type_id'];
        $interview->update();

        return response()->json($interview);
    }

    public function byApplication($application)
    {
        $interviews = Interview::where('application_id', $application)->with(['application', 'application.company', 'interview_type'])->get();
        return response()->json($interviews);
    }

    public function types()
    {
        $types = \App\Models\InterviewType::all();
        return $types->toJson();
    }
}
