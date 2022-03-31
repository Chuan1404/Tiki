const queryObject = (defaultValues = {}) => {
    try {
        var search = window.location.search.substring(1);
        const obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        return { ...defaultValues, ...obj }
    } catch (err) {
        return defaultValues
    }
}

export default queryObject;