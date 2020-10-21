import React, { useState, useEffect } from 'react'
import CardSetup from './CardSetup'
import axios from 'axios'

const ingredientsURL = 'http://.../api/ingredient'

const initialFormState={
    id: '',
    text: '',
    ingredient: '',
}

export default function IngredientEditor(){
    const [ingredients, setIngredients] = useState([])
    const [formValues, setFormValues] = useState(initialFormState)


    const getIngredient = () =>{
        axios.get(ingredientsURL)
        .then(response =>{
            setIngredients(response.data)
        })
        .catch(handleError)
    }

    const postIngredient = ({ text, ingredient}) =>{
        axios.post(ingredientsURL, {text, ingredient})
            .then(res => setIngredients(ingredients.concat(res.data)))
            .catch(handleError)
            .finally(resetForm)
    }

    const putIngredient = ({id, text, ingredient}) =>{
        axios.put(`${ingredientsURL}/${id}`, {text, ingredient})
            .then(res =>{
                setIngredients(ingredients.map(item =>{
                    return item.id === id ? res.data : item
                }))
            })
            .catch(handleError)
            .finally(resetForm)
    }

    const deleteIngredient =(id) =>{
        axios.delete(`${ingredientsURL}/${id}}`)
            .then(res =>{
                setIngredients(ingredients.filter(item => item.id !== id))
            })
    }

    const editIngredient = (id) =>{
        const item = ingredients.find(q=> id === id)
        setFormValues({...item})
    }

    const handleError = err => { debugger }
    const resetForm =() => setFormValues(initialFormState)

    useEffect(() => getIngredient(),[])

    return (
        <div>
            <h3>Ingredients</h3>
            <ul>
                {quotes.map((q,i)=>(
                    <li key={q.id}>
                        <div>{q.text} ({q.ingredient})</div>
                        <button data-cy={`editBtn${i}`} onClick={() => editIngredient(q.id)}>Edit</button>
                        <button data-cy={`deleteBtn${i}`} onClick={()=> deleteIngredient(q.id)}>Delete</button>
                    </li>
                ))
                }
            </ul>
            <CardSetup 
                values={formValues}
                setValues={setFormValues}
                submitHandlers={{postIngredient, putIngredient}}
                reset={resetForm}
            />
        </div>

    )
}