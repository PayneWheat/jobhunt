<?php

use Illuminate\Database\Seeder;
use App\State;
class StateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(($handle = fopen(public_path() . '/imports/states.csv', 'r')) !== false) {
            while(($data = fgetcsv($handle, 1000, ',')) !== false) {
                $state = new State();
                $state->name = $data[0];
                $state->abbreviation = $data[1];
                $state->save(); 
            }
            fclose($handle);
        }
    }
}
