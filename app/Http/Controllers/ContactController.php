<?php

namespace App\Http\Controllers;
use App\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return $contacts->toJson();
    }
    public function store($response)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'nullable',
            'address' => 'nullable',
            'company_id' => 'required'
        ]);
        $contact = Contact::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'company_id' => $validatedData['company_id']
        ]);
        return response()->json('Created contact');
    }
    public function show($id)
    {
        return Contact::findOrFail($id)->toJson();
    }
    public function update($contact)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'nullable',
            'address' => 'nullable',
            'company_id' => 'required'
        ]);
        $contact->name = $validatedData['name'];
        $contact->email = $validatedData['email'];
        $contact->phone = $validatedData['phone'];
        $contact->address = $validatedData['address'];
        $contact->company_id = $validatedData['company_id'];
        $contact->update();
        return response()->json('Contact updated');
    }
}
