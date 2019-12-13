<?php

namespace App\Http\Controllers;
use App\Interview;
use Illuminate\Http\Request;

class InterviewController extends Controller
{
    public function index()
    {
        $interviews = Interview::all();
        return $interviews->toJson();
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'at_time' => 'required|date',
            'application_id' => 'required|integer',
            'interview_type_id' => 'required|integer'
        ]);
        $interview = Interview::create([
            'at_time' => $validatedData['at_time'],
            'application_id' => $validatedData['application_id'],
            'interview_type_id' => $validatedData['interview_type_id']
        ]);
        return response()->json($interview);
    }
    public function show($id)
    {
        return Interview::findOrFail($id)->toJson();
    }
    public function update($interview)
    {
        // update
        $validatedData = $request->validate([
            'at_time' => 'required|date',
            'application_id' => 'required|integer',
            'interview_type_id' => 'required|integer'
        ]);
        $interview->at_time = $validatedData['at_time'];
        $interview->company_id = $validatedData['application_id'];
        $interview->interview_type_id = $validatedData['interview_type_id'];
        $interview->update();
        return response()->json($interview);
    }
    public function types()
    {
        $types = \App\InterviewType::all();
        return $types->toJson();
    }
}
