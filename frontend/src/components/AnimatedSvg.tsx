import icon from "../assets/icon.svg";
import {useClient} from "../context/ClientContext.ts";
import {useState} from "react";

function AnimatedSVG() {
    const {client, setClient} = useClient();
    const [wobble, setWobble] = useState(false)

    const handleClick = () => {
        setWobble(true)
        setClient({ ...client, balance: client.balance + 1 });
    };

    return (
        <div>
            <img
                className={wobble ? "animated-svg" : "cube"}
                onAnimationEnd={() => setWobble(false)}
                style={{ cursor: 'pointer' }}
                onClick={handleClick}
                src={icon}
                alt="Logo"
            ></img>
        </div>
    );
}

export default AnimatedSVG;