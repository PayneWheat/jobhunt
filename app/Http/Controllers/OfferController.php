<?php

namespace App\Http\Controllers;
use App\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::all();
        return $offers->toJson();
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'salary' => 'required',
            'expires' => 'nullable|date',
            'position' => 'required',
            'company_id' => 'required'
        ]);
        // add company_id
        $offer = Offer::create([
            'salary' => $validatedData['salary'],
            'expires' => $validatedData['expires'],
            'position' => $validatedData['position'],
            'company_id' => $validatedData['company_id']
        ]);
        return response()->json('Offer created');
    }
    public function show($id)
    {
        return Offer::findOrFail($id)->toJson();
    }
    public function update($offer)
    {
        $validatedData = $request->validate([
            'salary' => 'required',
            'expires' => 'nullable|date',
            'position' => 'required',
            'company_id' => 'required'
        ]);
        $offer->salary = $validatedData['salary'];
        $offer->expires = $validatedData['expires'];
        $offer->position = $validatedData['position'];
        $offer->position = $validatedData['company_id'];
        $offer->update();
        return response()->json('Offer updated');
    }
}
