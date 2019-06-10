<?php

namespace App\Http\Controllers;
use App\Interview;
use Illuminate\Http\Request;

class InterviewController extends Controller
{
    //protected $fillable = ['position', 'at_time'];
    public function index()
    {
        $interviews = Interview::all();
        return $interviews->toJson();
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'position' => 'required',
            'at_time' => 'required|date',
            'company_id' => 'required'
        ]);
        $interview = Interview::create([
            'position' => $validatedData['position'],
            'at_time' => $validatedData['at_time'],
            'company_id' => $validatedData['company_id']
        ]);
        return response()->json('Interview created');
    }
    public function show($id)
    {
        return Interview::findOrFail($id)->toJson();
    }
    public function update($interview)
    {
        // update
        $validatedData = $request->validate([
            'position' => 'required',
            'at_time' => 'required|date',
            'company_id' => 'required'
        ]);
        $interview->position = $validatedData['position'];
        $interview->at_time = $validatedData['at_time'];
        $interview->company_id = $validatedData['company_id'];
        $interview->update();
        return response()->json('Interview updated');
    }
}
