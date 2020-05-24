import React from 'react';
import Form from 'react-bootstrap/Form';

const Textarea = ({ name, placeholder, value, onChange, onBlur, text}) => {
    return (
        <Form.Group controlId={text.module + name}>
            <Form.Label>{text.label}</Form.Label>
            <Form.Control
                name={name}
                as="textarea"
                rows="10"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={text.error ? true : false}
            />
            <Form.Control.Feedback type="invalid">
                {text.error}
            </Form.Control.Feedback>
        </Form.Group>
    )
}



export default Textarea;