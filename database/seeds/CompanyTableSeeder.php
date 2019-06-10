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
            'name' => 'Example Co',
            'hq_location' => 'Sugar Land, TX',
            'phone' => '281-123-4567',
            'website' => 'www.exampleco.com'
        ]);
    }
}
