<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            InterviewTypeTableSeeder::class,
            ApplicationStatusTableSeeder::class,
            CompanyTableSeeder::class,
            LocationTableSeeder::class,
            ApplicationTableSeeder::class,
            StateTableSeeder::class,
            InterviewTableSeeder::class,
            NoteTableSeeder::class,
            ContactsTableSeeder::class
        ]);
    }
}
