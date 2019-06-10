<?php

use Illuminate\Database\Seeder;

class InterviewTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('interview_types')->insert([
            'type' => 'Phone'
        ]);
        DB::table('interview_types')->insert([
            'type' => 'Video Conference'
        ]);
        DB::table('interview_types')->insert([
            'type' => 'On-site'
        ]);
        DB::table('interview_types')->insert([
            'type' => 'Test'
        ]);
        DB::table('interview_types')->insert([
            'type' => 'Project'
        ]);
    }
}
