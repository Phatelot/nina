import { BMI } from "./weight_utils";

const ninasHeightInMeters = 1.4986;

export function ninasBMIForWeight(weightInLbs: number): number {
	return BMI(ninasHeightInMeters, weightInLbs);
}
