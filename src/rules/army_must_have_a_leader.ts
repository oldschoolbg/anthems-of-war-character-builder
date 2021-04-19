import { List } from '../objects/army';

export const ArmyMustHaveALeader = (army: List): boolean => army.Leader !== null;
