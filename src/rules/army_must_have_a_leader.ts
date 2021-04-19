import { List } from '../objects/list';

export const ArmyMustHaveALeader = (army: List): boolean => army.Leader !== null;
