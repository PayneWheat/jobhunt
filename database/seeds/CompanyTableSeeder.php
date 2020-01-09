<?php

use Illuminate\Database\Seeder;
//use Illuminate\Support\Facades\DB;
use App\Company;

class CompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Company::create([
            'name' => 'Fictional Company',
            'hq_location' => 'Sugar Land, TX',
            'phone' => '281-123-4567',
            'website' => 'www.fictionalco.com'
        ]);
        Company::create([
            'name' => 'XYZ, Inc.',
            'hq_location' => 'Houston, TX',
            'phone' => '713-123-4567',
            'website' => 'www.xyzinc.com'
        ]);
        Company::create([
            'name' => 'Dummy Data Co',
            'hq_location' => 'Houston, TX',
            'phone' => '281-987-6543',
            'website' => 'www.dummydataco.com'
        ]);
        Company::create([
            'name' => 'Example Enterprises',
            'hq_location' => 'Austin, TX',
            'phone' => '281-123-4567',
            'website' => 'www.exampleco.com'
        ]);
        Company::create([
            'name' => 'Yada Yada LLC',
            'website' => 'www.yadallc.com'
        ]);
        Company::create([
            'name' => 'Phony Systems',
            'website' => 'www.phonysystems.com'
        ]);
        Company::create([
            'name' => 'BlatantlyFake Inc',
            'website' => 'www.bfinc.com'
        ]);
        Company::create([
            'name' => 'Running Out Co',
            'website' => 'www.runningoutco.com'
        ]);
        Company::create([
            'name' => 'Of Company',
            'website' => 'www.oc.co'
        ]);
        Company::create([
            'name' => 'Name Ideas',
            'website' => 'www.nameideas.com'
        ]);
    }
}
