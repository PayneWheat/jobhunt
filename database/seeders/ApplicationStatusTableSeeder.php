<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ApplicationStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('application_statuses')->insert([
            'status' => 'Pending'
        ]);
        DB::table('application_statuses')->insert([
            'status' => 'Sent'
        ]);
        DB::table('application_statuses')->insert([
            'status' => 'Received'
        ]);
        DB::table('application_statuses')->insert([
            'status' => 'Screening'
        ]);
        DB::table('application_statuses')->insert([
            'status' => 'Assessment'
        ]);
        DB::table('application_statuses')->insert([
            'status' => 'Interview'
        ]);
        DB::table('application_statuses')->insert([
            'status' => 'Offer'
        ]);
        DB::table('application_statuses')->insert([
            'status' => 'Rejected'
        ]);
    }
}
