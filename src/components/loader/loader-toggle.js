
export const toggleLoader = ()=>{
    const loader = document.querySelector('.loader-comp');
    loader.style.display='none';
}

export const displayLoader=()=>{
    const loader = document.querySelector('.loader-comp');
    loader.style.display='inline';
}