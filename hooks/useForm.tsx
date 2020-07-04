// <T> 表示 useForm 里有一个类型，这个类型也是 initFormData 的类型
// 因为不知道 T 是什么，
import {ReactChild, useCallback, useState} from 'react';
import * as React from 'react';

type Field<T> = {
    label: string,
    type: 'text' | 'password' | 'textarea',
    key: keyof T
};

type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    onSubmit: (fd: T) => void;
}

export function useForm<T>(options: useFormOptions<T>) {
    // 非受控
    const {initFormData, fields, buttons, onSubmit} = options;
    const [formData, setFormData] = useState(initFormData);
    const [errors, setErrors] = useState(() => {
        const e: { [k in keyof T]?: string[] } = {};
        (Object.keys(initFormData) as Array<keyof T>)
            .map((key) => {e[key] = [];});
        return e;
    });

    const onChange = useCallback((key: keyof T, value: any) => {
        setFormData({...formData, [key]: value});
    }, [formData]);

    const _onSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit(formData);
    }, [onSubmit, formData]);

    const form = (
        <form onSubmit={_onSubmit}>
            {fields.map(field =>
                <div>
                    <label>{field.label}
                        {field.type === 'textarea'
                            ? <textarea
                                onChange={(e) => onChange(field.key, e.target.value)}>{formData[field.key]}</textarea>
                            : <input type={field.type} value={formData[field.key].toString()}
                                     onChange={(e) => onChange(field.key, e.target.value)}/>}
                    </label>
                    {errors[field.key]?.length > 0 && <div>
                        {errors[field.key].join(',')}
                    </div>}
                </div>
            )}

            <div>
                {buttons}
            </div>
        </form>
    );
    return {
        form: form, setErrors: setErrors
    };
}
