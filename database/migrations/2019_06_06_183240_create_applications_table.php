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
            $table->string('position');
            $table->unsignedInteger('company_id');
            $table->foreign('company_id')->references('id')->on('companies');
            $table->unsignedInteger('location_id');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->text('app_zip')->nullable();
            $table->unsignedInteger('status_id');
            $table->unsignedInteger('posted_salary_min')->nullable();
            $table->unsignedInteger('posted_salary_max')->nullable();
            $table->unsignedInteger('requested_salary')->nullable();
            $table->text('job_description')->nullable();
            $table->text('resume_text')->nullable();
            $table->text('coverletter_text')->nullable();
            $table->unsignedInteger('post_age')->nullable();
            $table->date('applied_at')->nullable();
            $table->text('workspace');
            $table->text('employment_classification')->nullable();
            $table->text('pay_rate_type');
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
