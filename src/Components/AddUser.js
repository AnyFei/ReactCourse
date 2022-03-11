import React, { useState, useRef } from 'react'
import Card from './Card'
import Button from '../UI/Button'
import classes from './AddUser.module.css'
import ErrorModal from './ErrorModal'
import Wrapper from './Helpers/Wrapper';

const AddUser = (props) =>{
    
    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setenteredAge] = useState('');
    const [error, setError] = useState();

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // This uses states to get the value
    // const usernameOnChangeHandler = event =>{
    //     setEnteredUsername(event.target.value);

    // };
    // const ageOnChangeHandler = event =>{
    //     setenteredAge(event.target.value);
    // };

    const addUserHandler = (event) =>{
        event.preventDefault();

        const enteredNameFromRef = nameInputRef.current.value;
        const enteredAgeFromRef = ageInputRef.current.value;

        if(enteredNameFromRef.trim().length === 0 || enteredAgeFromRef.trim().length === 0) {
            setError({
                title: 'Invalid input', 
                message: 'Enter a valid name and age'
            });
            return;
        }

        if(enteredAgeFromRef < 1) {
                setError({
                    title: 'Invalid input', 
                    message: 'Enter age greater than 0'
                });
            return;
        }
        props.onAddUser(enteredNameFromRef, enteredAgeFromRef);

        //using Ref to reset input, it's fine in this case but we shouldn't update DOM this way in most cases
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';

        // using state to reset the input value
        // setEnteredUsername('');
        // setenteredAge('');
    };
    const errorHandler = () => {
        setError(null);
    };

    return(
        <Wrapper>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}> 
            <label htmlFor='username'>Username</label>
            <input 
                type='text' 
                name='username' 
                // value={enteredUsername} 
                // onChange={usernameOnChangeHandler}
                ref={nameInputRef}
                >
            </input>
            <label htmlFor='age'>Age</label>

            <input 
                type='number' 
                name='age' 
                // value={enteredAge} 
                // onChange={ageOnChangeHandler}
                ref={ageInputRef}
                >
            </input>
            <Button type='submit'>Add user</Button>
        </form>
        </Card>
        </Wrapper>

    );
}

export default AddUser;
