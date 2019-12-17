import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faExclamationCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

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

const iconClassMap = {
  [Requirement_State.UNCHECKED]: "",
  [Requirement_State.NOT_SATISFIED]: "red",
  [Requirement_State.SATISFIED]: "green"
};

const iconMap = {
  [Requirement_State.UNCHECKED]: faMinus,
  [Requirement_State.NOT_SATISFIED]: faExclamationCircle,
  [Requirement_State.SATISFIED]: faCheckCircle
};

const RequirementListItem = ({
  children,
  isSatisfied
}: RequirementListItemProps) => (
  <li>
    <FontAwesomeIcon
      icon={iconMap[isSatisfied]}
      className={`mr2 ${iconClassMap[isSatisfied]}`}
    />
    {children}
  </li>
);

export default RequirementListItem;
