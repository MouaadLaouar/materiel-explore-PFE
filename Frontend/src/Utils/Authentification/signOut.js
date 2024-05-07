const SignOut = () => {
    try {
        localStorage.removeItem("userID");
    } catch (error) {
        console.error(error);
    }
};

export default SignOut;