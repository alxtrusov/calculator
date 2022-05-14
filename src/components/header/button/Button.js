import { useNavigate } from 'react-router-dom';
import './button.css';

function Button(props) {
    const { title, path, isActive, onClick } = props;
    const navigate = useNavigate();

    const onClickHandler = () => {
        onClick(path);
        navigate(path);
    }

    return (
        <div
            className={`field ${isActive === path ? 'active' : ''}`}
            onClick={onClickHandler}
        >{title}</div>
    );
}

export default Button;