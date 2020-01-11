<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
            InterviewTypeTableSeeder::class,
            ApplicationStatusTableSeeder::class,
            CompanyTableSeeder::class,
            LocationTableSeeder::class,
            ApplicationTableSeeder::class,
            StateTableSeeder::class,
            InterviewTableSeeder::class,
            NoteTableSeeder::class
        ]);
    }
}
