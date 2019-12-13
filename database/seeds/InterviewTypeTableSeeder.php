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
        // Screening application status
        DB::table('interview_types')->insert([
            'type' => 'Phone',
            'application_status_id' => 4
        ]);
        // Interview application status
        DB::table('interview_types')->insert([
            'type' => 'Video Conference',
            'application_status_id' => 6
        ]);
        // Interview application status
        DB::table('interview_types')->insert([
            'type' => 'On-site',
            'application_status_id' => 6
        ]);
        // Assessment application status
        DB::table('interview_types')->insert([
            'type' => 'Assessment',
            'application_status_id' => 5
        ]);
        // Assessment application status
        DB::table('interview_types')->insert([
            'type' => 'Project',
            'application_status_id' => 5
        ]);
    }
}
