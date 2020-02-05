<?php

namespace App\Http\Controllers;
use App\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            /*
            'notable_id' => 'required',
            'notable_type' => 'required',
            'note' => 'required'
            */
            'note' => 'required',
            'application_id' => 'required',
            'system_flag' => 'required'
        ]);
        $note = Note::create([
            /*
            'notable_id' => $validatedData['notable_id'],
            'notable_type' => $validatedData['notable_type'],
            'note' => $validatedData['note']
            */
            'note' => $validatedData['note'],
            'application_id' => $validatedData['application_id'],
            'system_flag' => $validatedData['system_flag']
        ]);
        return response()->json($note);
    }

}
