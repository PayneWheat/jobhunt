/**
 * Calculates and holds the positioning and width data of the dots and "top bar" for the salary chart.
 * 
 * Possible paths:
 *   1. Both max and min, requested salary (or not)
 *     * requested salary is less than min DONE
 *     * requested salary is more than max DONE
 *     * requested salary is in between DONE
 *   2. Max, no min, requested salary (or not)
 *     * requested salary is more than max
 *     * requested salary is less than max DONE
 *   3. no max, min, requested salary (or not)
 *     * requested salary is less than min
 *     * requested salary is more than min DONE
 *   4. no max, no min, requested salary
 *   5. no max, no min, no requested salary DONE
 */
export class SalaryChartPositions {
    minimumSalaryPosition;
    maximumSalaryPosition;
    requestedSalaryPosition;
    topBarWidth;
    topBarPosition;

    constructor(application) {
        this.requestedSalaryPosition = (!application.posted_salary_min && application.posted_salary_max) || (!application.posted_salary_max && application.posted_salary_min) ? 50 : 0;
        this.minimumSalaryPosition = 12.5;
        this.maximumSalaryPosition = 87.5;
        this.topBarWidth = application.posted_salary_min && application.posted_salary_max ? 75 : 87.5;
        this.topBarPosition = application.posted_salary_min ? 12.5 : 0;

        this.calculateChartObjectPositions(application);
    }

    /**
     * Calculates the position of the dots and top bar.
     * 
     * @param {*} application the application
     */
    calculateChartObjectPositions(application) {
        if (this.requestedSalaryIsLessThanMin(application)) {
            this.minimumSalaryPosition = this.calculateMedianPosition(application.requested_salary, application.posted_salary_min, application.posted_salary_max);
            this.requestedSalaryPosition = 12.5;
            this.topBarWidth = 87.5 - this.minimumSalaryPosition;
            this.topBarPosition = this.minimumSalaryPosition;
        } else if (this.requestedSalaryIsBetweenMinAndMax(application)) {
            this.requestedSalaryPosition = this.calculateMedianPosition(application.posted_salary_min, application.requested_salary, application.posted_salary_max);
            this.topBarWidth = 75;
        } else if (this.requestedSalaryIsMoreThanMax(application)) {
            this.maximumSalaryPosition = this.calculateMedianPosition(application.posted_salary_min, application.posted_salary_max, application.requested_salary);
            this.requestedSalaryPosition = 87.5;
            this.topBarWidth = 87.5 - this.maximumSalaryPosition;
        }
    }

    /**
     * Finds the x position of the middle dot.
     * 
     * @param {number} lowest  the lowest salary number
     * @param {number} median  the median salary number
     * @param {number} highest the highest salary number
     * 
     * @returns the x position of the middle dot
     */
    calculateMedianPosition(lowest, median, highest) {
        const highestLowestDiff = highest - lowest;
        const medianLowestDiff = median - lowest;
        const percent = (medianLowestDiff / highestLowestDiff) * 100;

        return percent * .75 + 12.5;
    }

    /**
     * Determines whether the requested salary amount is less that the posted salary minimum.
     * 
     * @returns boolean
     */
     requestedSalaryIsLessThanMin(application) {
        return application.posted_salary_min && 
            application.requested_salary && 
            application.posted_salary_min > application.requested_salary;
    }

    /**
     * Determines whether the requested salary amount is betwen that the posted salary minimum and maximum.
     * 
     * @returns boolean
     */
    requestedSalaryIsBetweenMinAndMax(application) {
        return (application.posted_salary_min && application.posted_salary_min <= application?.requested_salary) && 
            application?.requested_salary <= application?.posted_salary_max;
    }

    /**
     * Determines whether the requested salary amount is more that the posted salary maximum.
     * 
     * @returns boolean
     */
    requestedSalaryIsMoreThanMax(application) {
        return application.posted_salary_max && 
            application.requested_salary && 
            application.posted_salary_max < application.requested_salary;
    }
}