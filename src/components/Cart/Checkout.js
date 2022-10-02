import classes from './Checkout.module.css';
import useInput from '../../hooks/useInput';

const isNotEmpty = value => value.trim() !== '';


const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput, 
  }
    = useInput(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput, 
  }
    = useInput(isNotEmpty);
  
  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput, 
  }
     = useInput(isNotEmpty);


  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput, 
    }
       = useInput(isNotEmpty);  

  let formIsValid = false; 

  if(enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return; 
    }

    console.log('Submitted');
    console.log(enteredName);

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    });

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  // Css invalid Input control
  const nameControlClasses = `${classes.control} ${nameInputHasError ? classes.invalid : ''}`
  const streetControlClasses = `${classes.control} ${streetInputHasError ? classes.invalid : ''}`
  const postalCodeControlClasses = `${classes.control} ${postalCodeInputHasError ? classes.invalid : ''}`
  const cityControlClasses = `${classes.control} ${cityInputHasError ? classes.invalid : ''}`


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text'
          id='name' 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
         />
            {nameInputHasError && (<p className={classes.errorText}>Please entere a valid Name!</p>)}
      </div>
      <div className={streetControlClasses}>       
       <label htmlFor='street'>Street</label>
        <input 
          type='text' 
          id='street'
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
          {streetInputHasError && (<p className={classes.errorText}>Please entere a valid Street!</p>)}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input 
          type='text' 
          id='postal'
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
          {postalCodeInputHasError && (<p className={classes.errorText}>Please entere a valid Postal Code!</p>)}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input 
          type='text' 
          id='city'
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
          {cityInputHasError && (<p className={classes.errorText}>Please entere a valid City!</p>)}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;