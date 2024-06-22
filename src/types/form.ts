export interface FormTextInput {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
}

export interface FormMaxLenTextInput extends FormTextInput {
    maxLength: number | string;
}

export interface FormValue {
    value: string;
    error: string | null;
}