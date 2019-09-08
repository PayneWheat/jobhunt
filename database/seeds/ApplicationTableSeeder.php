<?php

use Illuminate\Database\Seeder;
use App\Application;

class ApplicationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Application::create([
            'position' => 'Software Developer',
            'company_id' => 1,
            'location_id' => 1,
            'status_id' => 1,
            'posted_salary_min' => 50000,
            'posted_salary_max' => 80000,
            'requested_salary' => 90000,
            'resume_text' => 'Resume text should go here. Hopefully I can find a way to preserve new lines',
            'coverletter_text' => 'Cover letter text should go here. Again, hopefully we can retain some formatting. Eventually implement file support for PDFs as well.',
            'post_age' => 3
        ]);
    }
}
