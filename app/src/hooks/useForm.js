import { useState } from "react";

const useForm = (initValue = {}) => {
    const [form, setForm] = useState(initValue);
    const [error, setError] = useState();

    const validate = () => {
        let errObj = {};

        for (let key of Object.keys(form)) {
            if (!form[key].trim()) {
                errObj[key] = 'Không được để trống';
            } else if (form[key].length < 2) {
                errObj[key] = 'Phải nhiều hơn 2 kí tự'
            }
        }

        setError({...errObj});
        return errObj
    }
    const onChange = (e) => {
        let name = e.target.name;
        
        setForm({
            ...form,
            [name]: e.target.value

        })
    }
    const register = (name) => {
        return {
            value: form[name],
            name,
            onChange
        }
    }
    const handleSubmit = () => {
        let errObj = validate();
        if(!Object.keys(errObj).length) {
            console.log('ok')
        }
    }
    return {
        form,
        error,
        validate,
        onChange,
        register,
        handleSubmit
    }
}

export default useForm;