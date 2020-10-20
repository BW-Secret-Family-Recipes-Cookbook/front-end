import React from 'react'


export default function RecipeCardSetup(props){
    //States and variables
    const{
        values,
        setValues,
        reset,
        submitHandlers:{postIngredient, putIngredient},
    } = props

    const onCancel = evt => {
        evt.preventDefault()
        reset()
    }

    const onSubmit = evt => {
        evt.preventDefault()
        values.id
          ? putIngredient(values)
          : postIngredient(values)
      }

    const onChange = evt => {
        const { name, value } = evt.target
        setValues({ ...values, [name]: value })
    }

    const isDisabled = () => {
        return !values.text.trim() || !values.recipe.trim()
    }


    return(
        <form onSubmit={onSubmit}>
            <h2>Recipe Card</h2>

            <input 
            name='recipe'
            type='text'
            value={values.recipe}
            onChange={onChange}
            placeholder='Enter Recipe Name'
            />

            <input
            name='ingredient'
            type='text'
            value={values.ingredient}
            onChange={onChange}
            placeholder='Enter Ingredient'
            />

            <input
            name='instructions'
            type='text'
            value={values.instructions}
            onChange={onChange}
            placeholder='Enter Instructions'
            />

            <button id='submitBtn' disabled ={isDisabled}>
                Submit {values.id ? 'Changes' : ''}
            </button>
            <button id='cancelBtn' onClick={onCancel}>
                Cancel
            </button>
        </form>
    )
}