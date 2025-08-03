const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0})
const bmiFormatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 1})

export function formatWeight(weight: number) : string {
    return formatter.format(weight).replaceAll(',','')
}

export function formatBMI(BMI: number) : string {
    return bmiFormatter.format(BMI).replaceAll(',','')
}

export function formatPercentage(percentage: number) : string {
    return bmiFormatter.format(percentage).replaceAll(',','')
}

export function BMI(heightInMeters: number, weightInLbs: number) : number {
	return toKg(weightInLbs) / heightInMeters / heightInMeters;
}

export function weightInLbsForBMI(heightInMeters: number, targetBMI: number): number {
	return targetBMI * heightInMeters * heightInMeters / 0.453;
}

export function toBMICategory(bmi: number): string {
	if (bmi < 18.5) {
		return 'underweight'
	} else if (bmi < 25) {
		return 'considered normal'
	} else if (bmi < 30) {
		return 'overweight'
	} else if (bmi < 35) {
		return 'obese'
	} else if (bmi < 40) {
		return 'morbidly obese'
	} else if (bmi < 50) {
		return 'extremely obese'
	} else if (bmi < 60) {
		return 'super obese'
	} else if (bmi < 80) {
		return 'hyper obese'
	} else if (bmi < 100) {
		return 'super hyper obese'
	} else if (bmi < 140) {
		return 'medical anomaly obese'
	} else {
		return 'immobile'
	}
}

export function toImperialHeight(heightInMeters: number) : string {
	const inches = Math.round(heightInMeters * 100 / 2.54);
	return `${Math.floor(inches/12)}'${inches % 12}"`;
}

export function toKg(weightInLbs: number) : number {
	return weightInLbs * 0.453;
}
