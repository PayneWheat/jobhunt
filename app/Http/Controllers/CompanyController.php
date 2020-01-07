<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        $companies->sortBy('name');
        return $companies->toArray();
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'phone' => 'nullable',
            'website' => 'required'
        ]);
        $company = Company::create([
            'name' => $validatedData['name'],
            'phone' => $validatedData['phone'],
            'website' => $validatedData['website']
        ]);
        return response()->json($company);
    }
    public function show($id)
    {
        return Company::findOrFail($id)->toJson();
    }
    public function update($company)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'hq_location' => 'nullable',
            'phone' => 'nullable',
            'website' => 'required'
        ]);

        $company->name = $validatedData['name'];
        $company->hq_location = $validatedData['hq_location'];
        $company->phone = $validatedData['phone'];
        $company->website = $validatedData['website'];
        $company->update();

        return response()->json('Company updated');
    }
}
