import { BasicPageParams } from "../../model/base.model";

export type LoadListFormState = {
  name: string;
};
export type LoadListParams = BasicPageParams & LoadListFormState;
