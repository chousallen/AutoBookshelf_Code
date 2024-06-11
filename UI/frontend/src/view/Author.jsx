const Author = () => {
    return (
        <div className="container">
            <h1 id="title">Author</h1>
            <p>The auto shelf is made by CarCar Wed afternoon team 3, including following creators:</p>
            <ul>
                <li><span><b>周冠宇</b>: Hardware (STM32, motor, encoder, UART communication, etc.)</span></li>
                <li><span><b>吳孟峰</b>: Software (User interface design, Frontend/Backend programming, etc.)</span></li>
                <li><span><b>陳世庭</b>: Structure (Shelf design, constuction, etc.)</span></li>
            </ul>
        </div>
    );
};

export default Author;