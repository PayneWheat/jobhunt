<?php

namespace App\Http\Controllers;
use App\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'notable_id' => 'required',
            'notable_type' => 'required',
            'note' => 'required'
        ]);
        $note = Note::create([
            'notable_id' => $validatedData['notable_id'],
            'notable_type' => $validatedData['notable_type'],
            'note' => $validatedData['note']
        ]);
        return response()->json('Note created');
    }

}
