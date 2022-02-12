<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\Company;

class ContactsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Contact::create([
            'name'       => 'Cindy Lou',
            'email'      => 'cindylou@fictionalcompany.com',
            'phone'      => '2811234567',
            'company_id' => Company::first()->id
        ]);
    }
}
