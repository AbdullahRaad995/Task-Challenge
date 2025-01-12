import React from 'react';
import { useParams } from 'react-router-dom';


export default function ViewItemsPage() {

    const { id } = useParams();

    return(
        <h2>{`item : ${id}`}</h2>
    )
}