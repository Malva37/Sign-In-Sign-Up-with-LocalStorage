let getSel = (sel) => document.querySelector(sel);

let errorsSignUp = document.querySelectorAll('.signUp span.error');
let errorsSignIn = document.querySelectorAll('.signIn span.error');

let signUpForm = document.forms['signUp'];
let signInForm = document.forms['signIn'];
let signUpFormElements = document.querySelectorAll('.signUp input');
let signInFormElements = document.querySelectorAll('.signIn input');
let arrayInputsSignUpForm = Array.prototype.slice.call(signUpFormElements);
let arrayInputsSignInForm = Array.prototype.slice.call(signInFormElements);
let user;
let users = [];
localStorage.setItem('users', JSON.stringify(users));


class User {
    constructor(firstN, secondN, email, password) {
        this.firstN = firstN;
        this.secondN = secondN;
        this.email = email;
        this.password = password;
    }
}

getSel('.changeOnSignIn').onclick = () => {
    getSel('.signIn').style.display = 'block';
    getSel('.signUp').style.display = 'none';
    signUpForm.reset();
    errorsSignUp.forEach(elem => elem.style.backgroundColor = 'white');
    arrayInputsSignInForm.forEach(elem => elem.style.border = '2px solid gray');
}
getSel('.changeOnSignUp').onclick = () => {
    getSel('.signUp').style.display = 'block';
    getSel('.signIn').style.display = 'none';
    signInForm.reset();
    errorsSignIn.forEach(elem => elem.style.backgroundColor = 'white');
    arrayInputsSignUpForm.forEach(elem => elem.style.border = '2px solid gray');
}


getSel('.btnSignUp').onclick = () => {
    let firstName = getSel('.firstNameSignUp').value;
    let secondName = getSel('.secondNameSignUp').value;
    let email = getSel('.emailSignUp').value;
    let password = getSel('.passwordSignUp').value;

    if (isFormValid(arrayInputsSignUpForm)) {
        console.log(('all fields are valid'));
        if (isEmailExist(email)) {
            getSel('.messageEmailSignUp').style.backgroundColor = 'white';
            let user = new User(firstName, secondName, email, password);
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            arrayInputsSignUpForm.forEach(elem => elem.style.border = '2px solid gray');
            signUpForm.reset();
        }
    }
}

function isFormValid(array) {
    let isValid = true;
    array.forEach((element) => {
        let isCurrentFieldValid = isLengthValid(element);
        if (!isCurrentFieldValid) {
            isValid = false;
        }
    })
    return isValid;
}

function isLengthValid(field) {
    if (field.value.length >= 2) {
        field.style.border = '2px solid green';
        field.nextElementSibling.style.backgroundColor = 'white';
        return true;
    } else if (!field.value) {
        field.style.border = '2px solid red';
        field.nextElementSibling.style.backgroundColor = 'crimson';
        field.nextElementSibling.textContent = 'This field can not be empty';
        return false;
    } else {
        field.style.border = '2px solid red';
        field.nextElementSibling.style.backgroundColor = 'crimson';
        field.nextElementSibling.textContent = 'This field must be longer(more than 1 chains)';
        return false;
    }
}

function isEmailExist(emailValue) {
    if (users.some((user) => user.email == emailValue)) {
        errorsSignUp.forEach(elem => elem.style.backgroundColor = 'white');
        getSel('.messageEmailSignUp').textContent = 'This email already exist';
        getSel('.messageEmailSignUp').style.backgroundColor = 'crimson';
        getSel('.emailSignUp').style.border = '2px solid red';
        return false;
    } else {
        return true;
    }
}


getSel('.btnSignIn').onclick = () => {
    let email = getSel('.emailSignIn').value;
    let password = getSel('.passwordSignIn').value;
    if (isFormValid(arrayInputsSignInForm)) {
        if (getUser(email, password)) {

        }

    }

    function getUser(email, password) {
        let fromJSONUsers = JSON.parse(localStorage.getItem('users'));
        if (!fromJSONUsers) {
            getSel('.messagePasswordSignIn').textContent = 'Local Storage is empty';
            getSel('.messagePasswordSignIn').style.backgroundColor = 'crimson';
            arrayInputsSignInForm.forEach(elem => elem.style.border = '2px solid gray');
        } else {
            for (let i = 0; i < fromJSONUsers.length; i++) {
                let user = fromJSONUsers[i];
                if (user.email == email && user.password == password) {
                    getSel('.cardUser').style.display = 'block';
                    getSel('.signIn').style.display = 'none';
                    getSel('.userFirstName').textContent = user.firstName;
                    getSel('.userSecondName').textContent = user.secondName;
                    getSel('.userEmail').textContent = user.email;
                    signInForm.reset();
                    arrayInputsSignInForm.forEach(elem => elem.style.border = '2px solid gray');
                    errorsSignIn.forEach(elem => elem.style.backgroundColor = 'white');
                    return user;
                } else {
                    arrayInputsSignInForm.forEach(elem => elem.style.border = '2px solid gray');
                    getSel('.messagePasswordSignIn').textContent = 'Incorrect email or password';
                    getSel('.messagePasswordSignIn').style.backgroundColor = 'crimson';
                }
            }
        }

    }
}

getSel('.btnSignOut').onclick = () => {
    user = {};
    getSel('.signIn').style.display = 'block';
    getSel('.cardUser').style.display = 'none';

}