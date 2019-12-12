import React from "react";

interface RequirementListItemProps {
  children: string;
  isSatisfied: Requirement_State;
}

export interface Requirement {
  req: string;
  state: Requirement_State;
}

export enum Requirement_State {
  UNCHECKED,
  SATISFIED,
  NOT_SATISFIED
}

const requirementListItemClassMap = {
  [Requirement_State.UNCHECKED]: "",
  [Requirement_State.NOT_SATISFIED]: "bg-red",
  [Requirement_State.SATISFIED]: "bg-green"
};

const RequirementListItem = ({
  children,
  isSatisfied
}: RequirementListItemProps) => (
  <li className={requirementListItemClassMap[isSatisfied]}>{children}</li>
);

export default RequirementListItem;
