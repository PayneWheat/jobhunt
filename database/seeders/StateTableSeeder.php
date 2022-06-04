<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\State;
class StateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(($handle = fopen(base_path('/database/fixtures/states.csv'), 'r')) !== false) {
            while(($data = fgetcsv($handle, 1000, ',')) !== false) {
                State::firstOrCreate([
                    'name'         => $data[0],
                    'abbreviation' => $data[1],
                ]);
            }
            fclose($handle);
        }
    }
}
