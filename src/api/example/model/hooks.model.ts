import { BasicPageParams } from "../../model/base.model";

export type LoadListFormState = {
  type: string;
};
export type LoadListParams = BasicPageParams & LoadListFormState;
