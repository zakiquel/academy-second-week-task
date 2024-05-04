export enum ButtonTypes {
  SUBMIT = 'submit',
  BUTTON = 'button'
}

export enum FieldTypes {
  TEXT = 'text',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  FILE = 'file',
  CHECKBOX = 'checkbox',
  COLOR = 'color',
  SELECT = 'select'
}

export interface FormButtons {
  name: string;
  type: ButtonTypes;
}

export interface FormFieldBase {
  id: string;
  type: FieldTypes;
  label: string;
  required: boolean;
}

export interface InputField extends FormFieldBase {
  placeholder: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  mask?: string;
}

export interface ColorField extends FormFieldBase {
  options: string[];
}

export interface SelectField extends FormFieldBase {
  multiple: boolean;
  options: string[];
}

export interface ImageField extends FormFieldBase {
  multiple: boolean;
  options: string[];
}
export interface FileField extends FormFieldBase {
  formats: string;
  max_size: number;
  max_count: number;
}


export interface Data {
  form_name: string;
  form_description?: string;
  form_fields: (InputField | ColorField | SelectField | ImageField | FileField)[];
  form_buttons: FormButtons[];
}