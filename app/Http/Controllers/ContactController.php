<?php

namespace App\Http\Controllers;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::with('company')->get();
        return $contacts->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'nullable',
            'address' => 'nullable',
            'company_id' => 'nullable'
        ]);

        $contact = Contact::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'company_id' => $validatedData['company_id']
        ]);

        return response()->json($contact);
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

    public function byCompany($id)
    {
        $contacts = Contact::where('company_id', $id)->with('company')->get();

        return response()->json($contacts);
    }
}
