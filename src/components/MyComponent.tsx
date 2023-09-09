import React from "react";

export class MyComponent extends React.Component {
    render() {
        fetch('https://localhost:7128/api/Products')
        .then(response => response.json())
        .then(data => console.log(data));

        return <>
            My Component
        </>;
    }
}