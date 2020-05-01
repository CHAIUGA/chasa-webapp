import React from 'react'

export default function InputField({ field, ...props }) {
    return (
            <input {...field} {...props} />
    )
}
