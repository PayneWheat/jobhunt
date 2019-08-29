<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->increments('id');
            //$table->string('resume');
            $table->string('position');
            $table->unsignedInteger('company_id');
            $table->string('location');
            $table->unsignedInteger('application_status_id');
            $table->unsignedInteger('posted_salary_min')->nullable();
            $table->unsignedInteger('posted_salary_max')->nullable();
            $table->unsignedInteger('requested_salary')->nullable();
            $table->text('job_description')->nullable();
            $table->text('resume_text')->nullable();
            $table->text('coverletter_text')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applications');
    }
}
