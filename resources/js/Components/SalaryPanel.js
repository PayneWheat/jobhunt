import React, { Component } from 'react';
import { SalaryChartPositions } from '@/Structures/SalaryChartPositions';

class SalaryPanel extends Component {
    constructor(props) {
        super(props);

        this.minSalaryText = React.createRef();
        this.maxSalaryText = React.createRef();
        this.requestSalaryText = React.createRef();

        this.state = {
            chartPositions: new SalaryChartPositions(this.props.application)
        };
    }

    /**
     * Counts the number of non-null salary fields provided by the user.
     * 
     * @param {*} application the application 
     * @returns {number} the count of non-null salary fields 
     */
    salaryFieldsCount(application) {
        let count = 0;
        
        application.posted_salary_min && count++;
        application.posted_salary_max && count++;
        application.requested_salary && count++;

        return count;
    }



    /**
     * Renders the salary info panel.
     */
    render() {
        const { application } = this.props;
        const { chartPositions } = this.state;
        
        let requestedSalaryWidth = this.requestSalaryText?.current?.offsetWidth;
        let minSalaryWidth = this.minSalaryText?.current?.offsetWidth;
        let maxSalaryWidth = this.maxSalaryText?.current?.offsetWidth;

        return (
            (chartPositions && (application.posted_salary_min != undefined || application.posted_salary_max != undefined || application.requested_salary != undefined)) ? (
                this.salaryFieldsCount(application) > 1 ? (
                <div>
                    <div className="text-lg text-center w-full mb-4 text-gray-700 dark:text-gray-50">
                        Salary
                    </div>
                    <div className="relative h-16 w-full">
                        <div className="relative top-8 z-10 h-2 bg-gray-200 rounded">
                            <div className="absolute rounded bg-green-500 h-full" style={{left: `${chartPositions.topBarPosition}%`, width: `${chartPositions.topBarWidth}%`}}></div>
                        </div>
                        { application.requested_salary ? (
                            <div>
                                <div className="absolute rounded-full bg-black w-2 h-2 top-8 z-30" style={{left: `${chartPositions.requestedSalaryPosition}%`, transform: "translateX(-0.25rem)"}}></div>
                                <div ref={this.requestSalaryText} className="absolute -top-1" style={{left: `${chartPositions.requestedSalaryPosition}%`, transform: `translateX(-${requestedSalaryWidth ? requestedSalaryWidth / 2 : 0}px)`}}>
                                    ${application.requested_salary.toLocaleString("en-US")}
                                </div>
                                <div className="absolute top-4 border-l-2 border-black w-px h-4" style={{left: `${chartPositions.requestedSalaryPosition}%`, transform: "translateX(-0.5px)"}}></div>
                            </div>
                        ) : null }
                        { application.posted_salary_min ? (
                            <div>
                                <div ref={this.minSalaryText} className="absolute top-14" style={{left: `${chartPositions.minimumSalaryPosition}%`, transform: `translateX(-${minSalaryWidth ? minSalaryWidth / 2 : 0}px)`}}>
                                    ${application.posted_salary_min.toLocaleString("en-US")}
                                </div>
                                <div className="absolute rounded-full bg-yellow-300 w-4 h-4 top-7 z-20" style={{left: `${chartPositions.minimumSalaryPosition}%`, transform: "translateX(-0.5rem)"}}></div>
                                <div className="absolute top-10 border-l-2 border-black w-px h-4" style={{left: `${chartPositions.minimumSalaryPosition}%` }}></div>
                            </div>
                        ) : null }
                        { application.posted_salary_max ? (
                            <div>
                                <div ref={this.maxSalaryText} className="absolute top-14" style={{left: `${chartPositions.maximumSalaryPosition}%`, transform: `translateX(-${maxSalaryWidth ? maxSalaryWidth / 2 : 0}px)`}}>
                                    ${application?.posted_salary_max?.toLocaleString("en-US")}
                                </div>
                                <div className="absolute top-10 border-r-2 border-black w-px h-4" style={{left: `${chartPositions.maximumSalaryPosition}%` }}></div>
                                <div className="absolute rounded-full bg-yellow-300 w-4 h-4 top-7 z-20" style={{left: `${chartPositions.maximumSalaryPosition}%`, transform: "translateX(-0.5rem)"}}></div>
                            </div>
                        ) : null }
                    </div>
                </div>
                ) : (
                    <div>
                        {application.posted_salary_min && (<div>Starting at ${application.posted_salary_min.toLocaleString("en-US")}</div>)}
                        {application.posted_salary_max && (<div>Up to ${application.posted_salary_max.toLocaleString("en-US")}</div>)}
                        {application.requested_salary && (<div>Requested ${application.requested_salary.toLocaleString("en-US")}</div>)}
                    </div>
                )
            ) : (
                <div><em>No salary information</em></div>
            )
        );
    }
}

export default SalaryPanel;