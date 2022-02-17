<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use Database\Factories\UserFactory;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'email' => 'test@email.com'
        ]);
    }
}
