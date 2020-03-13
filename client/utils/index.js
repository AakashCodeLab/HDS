const validateEmail = (email) =>  {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const lowercase = arr => arr.map(a => a.toLowerCase());

const generateOTP = () => Math.random().toString(10).slice(-4);

export { validateEmail, generateOTP, lowercase };