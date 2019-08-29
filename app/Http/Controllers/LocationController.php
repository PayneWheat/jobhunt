<?php

namespace App\Http\Controllers;
use App\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        return $locations->toJson();
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'city' => 'required',
            'state' => 'required'
        ]);
        $location = Location::create([
            'city' => $validatedData['city'],
            'state' => $validatedData['state']
        ]);
        return response()->json($location);
    }
    public function show($id)
    {
        return Location::findOrFail($id)->toJson();
    }
    public function update($location)
    {
        $validatedData = $request->validate([
            'city' => 'required',
            'state' => 'required',
        ]);
        $location->name = $validatedData['city'];
        $location->email = $validatedData['state'];
        $location->update();
        return response()->json('Location updated');
    }
}
