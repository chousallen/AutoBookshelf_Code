const Instruction = () => {
    return (
        <div className="container">
            <h1 id="title">Instruction</h1>
            <ul>
                <li>
                    <span>
                        <b>Register your stuff</b><br></br>
                        Enter the name of the stuff in the "Stuff" box, and also enter the index of the shelf where you put the stuff in the "ShelfNo" box. 
                        <b className="warning"> (the index of the shelf should be an integer between 1 and 6)</b> Then, click the "Add stuff" button, and the stuff will be registered.
                    </span>
                </li>
                <li>
                    <img src="../images/add.png" alt="add"/> 
                </li>
                <li>
                    <span>
                        <b>Take out your stuff</b><br></br>
                        Click the according "Take this stuff" button, which requestes the backend to run a python script and activates the shelf. After the shelf stops moving, you can take your stuff out.
                    </span>
                </li>
                <li>
                    <img src="../images/take.png" alt="add"/> 
                </li>
            </ul>
        </div>
    );
};

export default Instruction;