import { Army } from '../objects/army';

export const ArmyMustHaveALeader = (army: Army): boolean => army.Leader !== null;
