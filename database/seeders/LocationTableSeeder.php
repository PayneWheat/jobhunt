<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Location::create([
            'city'=>'Sugar Land',
            'state'=>'Texas'
        ]);
        Location::create([
            'city'=>'Houston',
            'state'=>'Texas'
        ]);
        Location::create([
            'city'=>'Austin',
            'state'=>'Texas'
        ]);
        Location::create([
            'city'=>'Round Rock',
            'state'=>'Texas'
        ]);
        Location::create([
            'city'=>'San Francisco',
            'state'=>'California'
        ]);
        Location::create([
            'city'=>'Los Angeles',
            'state'=>'California'
        ]);
        Location::create([
            'city'=>'San Diego',
            'state'=>'California'
        ]);
        Location::create([
            'city'=>'New York',
            'state'=>'New York'
        ]);
    }
}
