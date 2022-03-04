const successToast = (title,toast) => {
    toast({
        title,
        status:'success',
        duration:3000
    })
};
const errorToast = (title,toast) => {
    toast({
        title,
        status:'error',
        duration:3000
    })
};
export {successToast,errorToast};