<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Interview;
use App\Models\User;

class InterviewTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userId = User::firstOrFail()->getKey();

        Interview::create([
            'user_id'           => $userId,
            'at_time'           => date("Y-m-d", strtotime("-3 days")) . " 12:00:00",
            'application_id'    => '1',
            'interview_type_id' => '1',
            'created_at'        => date("Y-m-d", strtotime("-3 days")),
            'updated_at'        => date("Y-m-d H:i:s")
        ]);

        Interview::create([
            'user_id'           => $userId,
            'at_time'           => date("Y-m-d", strtotime("-1 days")) . " 9:30:00",
            'application_id'    => '1',
            'interview_type_id' => '2',
            'created_at'        => date("Y-m-d", strtotime("-1 days")),
            'updated_at'        => date("Y-m-d H:i:s")
        ]);

        Interview::create([
            'user_id'           => $userId,
            'at_time'           => date("Y-m-d", strtotime("+3 days")) . " 14:15:00",
            'application_id'    => '1',
            'interview_type_id' => '3',
            'created_at'        => date("Y-m-d", strtotime("-2 days")),
            'updated_at'        => date("Y-m-d H:i:s")
        ]);

        Interview::create([
            'user_id'           => $userId,
            'at_time'           => date("Y-m-d", strtotime("-3 days")) . " 14:15:00",
            'application_id'    => '5',
            'interview_type_id' => '1',
            'created_at'        => date("Y-m-d", strtotime("-2 days")),
            'updated_at'        => date("Y-m-d H:i:s")
        ]);

        Interview::create([
            'user_id'           => $userId,
            'at_time'           => date("Y-m-d", strtotime("+2 days")) . " 15:00:00",
            'application_id'    => '5',
            'interview_type_id' => '3',
            'created_at'        => date("Y-m-d", strtotime("2 days")),
            'updated_at'        => date("Y-m-d H:i:s")
        ]);
    }
}
