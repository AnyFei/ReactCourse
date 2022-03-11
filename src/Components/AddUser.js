import React, { useState } from 'react'
import Card from './Card'
import Button from '../UI/Button'
import classes from './AddUser.module.css'
import ErrorModal from './ErrorModal'
import Wrapper from './Helpers/Wrapper';

const AddUser = (props) =>{
    
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setenteredAge] = useState('');
    const [error, setError] = useState();

    const usernameOnChangeHandler = event =>{
        setEnteredUsername(event.target.value);

    };
    const ageOnChangeHandler = event =>{
        setenteredAge(event.target.value);
    };

    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input', 
                message: 'Enter a valid name and age'
            });
            return;
        }

        if(enteredAge < 1) {
                setError({
                    title: 'Invalid input', 
                    message: 'Enter age greater than 0'
                });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setenteredAge('');
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
            <input type='text' name='username' value={enteredUsername} onChange={usernameOnChangeHandler}></input>
            <label htmlFor='age'>Age</label>
            <input type='number' name='age' value={enteredAge} onChange={ageOnChangeHandler}></input>
            <Button type='submit'>Add user</Button>
        </form>
        </Card>
        </Wrapper>

    );
}

export default AddUser;
