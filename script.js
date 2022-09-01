let getSel = (sel) => document.querySelector(sel);

let errorsSignUp = document.querySelectorAll('.signUp span.error');
let errorsSignIn = document.querySelectorAll('.signIn span.error');

let signUpForm = document.forms['signUp'];
let signInForm = document.forms['signIn'];
let users = [];
let user;

getSel('.changeOnSignIn').onclick = () => {
    getSel('.signIn').style.display = 'block';
    getSel('.signUp').style.display = 'none';
    errorsSignUp.forEach(elem =>elem.style.backgroundColor = 'white')

}
getSel('.changeOnSignUp').onclick = () => {
    getSel('.signUp').style.display = 'block';
    getSel('.signIn').style.display = 'none';
    errorsSignIn.forEach(elem =>elem.style.backgroundColor = 'white')

}

class User {
    constructor(firstN, secondN, email, password) {
        this.firstN = firstN;
        this.secondN = secondN;
        this.email = email;
        this.password = password;
    }
}
getSel('.btnSignUp').onclick = () => {
    let firstName = getSel('.firstNameSignUp').value;
    let secondName = getSel('.secondNameSignUp').value;
    let email = getSel('.emailSignUp').value;
    let password = getSel('.passwordSignUp').value;
    if (users.some((user) => user.email == email)) {
        getSel('.messageEmailSignUp').style.backgroundColor = 'crimson';
        return;
    } else {
        getSel('.messageEmailSignUp').style.backgroundColor = 'white';
        let user = new User(firstName, secondName, email, password);
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        signUpForm.reset();
    }
}

getSel('.btnSignIn').onclick = () => {
    let email = getSel('.emailSignIn').value;
    let password = getSel('.passwordSignIn').value;
    if(!email && !password){
        getSel('.messagePasswordSignIn').style.backgroundColor = 'crimson';
        getSel('.messagePasswordSignIn').textContent = 'Email and password are empty';
    } else if(!email){
        getSel('.messagePasswordSignIn').style.backgroundColor = 'crimson';
        getSel('.messagePasswordSignIn').textContent = 'Email is empty';
    } else if(!password){
        getSel('.messagePasswordSignIn').style.backgroundColor = 'crimson';
        getSel('.messagePasswordSignIn').textContent = 'Password is empty';
    }else{
        getSel('.messagePasswordSignIn').style.backgroundColor = 'white';
        fromJSONUsers = JSON.parse(localStorage.getItem('users'));
        for (let i = 0; i < fromJSONUsers.length; i++) {
            let user = fromJSONUsers[i];
            if (user.email == email && user.password == password) {
                getSel('.cardUser').style.display = 'block';
                getSel('.signIn').style.display = 'none';
                getSel('.userFirstName').textContent = user.firstN;
                getSel('.userSecondName').textContent = user.secondN;
                getSel('.userEmail').textContent = user.email;
                return user;
            }
        }
    }
}

getSel('.btnSignOut').onclick = ()=>{
    user={};
    getSel('.signIn').style.display = 'block';
    getSel('.cardUser').style.display = 'none';

}