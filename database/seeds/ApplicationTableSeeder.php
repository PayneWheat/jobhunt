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
            'job_description' => "This is a sample job description for a fictional company. Example Co is looking for an experienced software developer to join our team.

            The right applicant's day to day would include meeting with stakeholders, turning ideas into code, and engineering solutions. You will be a part of a pool of talented individuals who will bolster your growth.
            
            You should have:
            A passion for coding
            A BS in computer science or 3 years of experience developing software
            Exposure to Agile development
            Exposure to source control (Git, SVN)
            Expertise in Object Oriented Programming/OOP
            Expertise in back-end architecture such as MVC
            
            Nice to haves:
            Experience with PHP, Java, JavaScript, or C / C++ / C#
            Mobile application development
            
            What we offer:
            Salary: $50,000 to $80,000
            Medical, Life, Dental insurance
            14 PTO Days, 21 days after 18 months
            Opportunity for advancement",
            'resume_text' => 'Joe Doe
            Software Engineer
            Team player. Problem solver. Quick learner. Ego-free. Deeply interested in back-end services, database design, cloud computing, and programming paradigms.
            Education
            B.S. in Computer Science
            University of Somewhere
            May 2019, cum laude. GPA 3.6/4.0
            Developed iOS application using AWS for the backend as a senior project.
            Technical Lead
            SomeCompany
            May 2016 - June 2018
            Co-founded a digital consulting agency focused on developing marketing and technical solutions.
            Collaboratively implemented web applications and content management system plug-ins to meet client requirements.
            Web Developer
            Freelance
            September 2014 - May 2016
            Requirement elicitation via communication with clients.
            Full-stack development of web applications for small businesses and nonprofits.
            Technology
            Languages: Java, C++, C, Python, JavaScript/ECMAScript, PHP, SQL, C#, HTML/XML, CSS
            Frameworks: Laravel, Express, .NET Core
            Database Management Systems: MySQL, Microsoft SQL Server, PostgreSQL, MongoDB
            Cloud Services: Heroku, AWS, Azure
            Methodology: OOP, MVC, Functional Programming, RESTful, Agile Development, TDD
            Source Control: Git, SVN
            Continuous Integration/Delivery: Travis CI, Jenkins, Maven
            Testing Suites: JUnit, PHPUnit, XCode',
            'coverletter_text' => 'Cover letter text should go here. Again, hopefully we can retain some formatting. Eventually implement file support for PDFs as well.',
            'post_age' => 3
        ]);
    }
}
