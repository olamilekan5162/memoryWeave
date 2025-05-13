const Button = ({title, variant}) => {
    return ( 
        <button className={`${variant}`}>
            {title}
        </button>
     );
}
 
export default Button;