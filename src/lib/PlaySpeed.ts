import { weighings } from './weighings.json';

export const playSpeeds = ["hyper slow", "super slow", "slow", "default", "fast", "very fast"] as const;
export type PlaySpeed = typeof playSpeeds[number];

export function delayForSpeed(speed?: string): number {
	switch (speed) {
		case "hyper slow":
			return 500;
		case "super slow":
			return 250;
		case "slow":
			return 150;
		case "fast":
			return 50;
		case "very fast":
			return 25;
	}
	return 80;
}

export function delayForLinearWgSpeed(speed?: string): number {
	return delayForSpeed(speed) / lbsPerDayAverage;
}

export function dayPerSecondLabel(speed?: string): string {
	return `${speedFormatter.format(1000 / delayForSpeed(speed))} days/s`
}

const firstWeighing = weighings[0];
const lastWeighing = weighings[weighings.length - 1];

const lbsPerDayAverage = (lastWeighing.weightInLbs - firstWeighing.weightInLbs) / lastWeighing.day;

export function lbsPerSecondLabel(speed?: string): string {
	return `${speedFormatter.format(1000 / delayForSpeed(speed) * lbsPerDayAverage)} lbs/s`
}

const speedFormatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 1})

export function formatScale(scale: number) : string {
    return speedFormatter.format(scale).replaceAll(',','')
}
