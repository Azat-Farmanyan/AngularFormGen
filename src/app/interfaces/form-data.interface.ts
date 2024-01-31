export interface FormDataI {
  fields: FormFieldI[];
}

export interface FormFieldI {
  type: string;
  labelRu: string;
  labelEn: string;
  description?: string;
  required?: boolean;
  choices?: string[];
  inputType?: string; // text or number
  multiple?: boolean;
  placeholder?: string;
}
