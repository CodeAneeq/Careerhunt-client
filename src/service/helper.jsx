const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Helpers = {
    validateEmail(email) {
        return emailRegex.test(email);
    },
    validatePassword(password){
        return password.length > 7;
    },
    validateName(name){
        return name.length > 2;
    },
    priceFormatter(amount){
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
        }).format(amount);
    }
}