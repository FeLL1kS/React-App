export const required = (value) => {
    return value ? undefined : "Field is required" 
}

export const maxLengthCreator = (length) => (value) => {
    return (value && value.length < length) ? undefined : `Max length is ${length}`  
}