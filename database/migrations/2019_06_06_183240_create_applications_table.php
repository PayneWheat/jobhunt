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
            $table->foreign('company_id')->references('id')->on('companies');
            $table->unsignedInteger('location_id');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->unsignedInteger('status_id');
            //$table->foreign('status_id')->references('id')->on('application_statuses');
            $table->unsignedInteger('posted_salary_min')->nullable();
            $table->unsignedInteger('posted_salary_max')->nullable();
            $table->unsignedInteger('requested_salary')->nullable();
            $table->text('job_description')->nullable();
            $table->text('resume_text')->nullable();
            $table->text('coverletter_text')->nullable();
            $table->unsignedInteger('post_age')->nullable();
            $table->timestamps();
            
            
            //$table->foreign('location_id')->references('id')->on('locations');
            //$table->foreign('application_status_id')->references('id')->on('application_statuses');



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
