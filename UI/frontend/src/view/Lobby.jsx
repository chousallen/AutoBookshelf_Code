import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import ApolloProvider from "../ApolloProvider";
import "../App.css";

const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            title
            shelfNo
        }
    }
`;

const CREATE_BOOK = gql`
    mutation CreateBook($title: String!, $shelfNo: String!) {
        createBook(title: $title, shelfNo: $shelfNo) {
            id
            title
            shelfNo
        }
    }
`;

const DELETE_BOOK = gql`
    mutation DeleteBook($id: ID!) {
        deleteBook(id: $id) {
            id
        }
    }
`;

export function Notice({ warningVisible, warningText }) {  
    if(warningVisible) return <p class="warning">{warningText}</p>;
    else return;
}

const Main = () => {
    const { loading, error, data, refetch } = useQuery(GET_BOOKS);
    const [createBook] = useMutation(CREATE_BOOK);
    const [deleteBook] = useMutation(DELETE_BOOK);

    const [title, setTitle] = useState("");
    const [shelfNo, setShelfNo] = useState("");
    const [warningText, setWarningText] = useState(Array(2).fill(""));
    const [warningVisible, setWarningVisible] = useState(Array(2).fill(false));
    //const [publishDate, setPublishDate] = useState("");

    function invalidShelfNo(){
        const nextWarningText = warningText.slice();
        nextWarningText[1] = "ShelfNo must be an Valid Integer!";
        setWarningText(nextWarningText);
        const nextWarningVisible = warningVisible.slice();
        nextWarningVisible[1] = true;
        setWarningVisible(nextWarningVisible);
    }

    function validShelfNo(){
        const nextWarningText = warningText.slice();
        nextWarningText[1] = "";
        setWarningText(nextWarningText);
        const nextWarningVisible = warningVisible.slice();
        nextWarningVisible[1] = false;
        setWarningVisible(nextWarningVisible);
    }

    /*
    function noBook(){
        const nextWarningText = warningText.slice();
        nextWarningText[0] = "There's no book right now. Add one!";
        setWarningText(nextWarningText);
        const nextWarningVisible = warningVisible.slice();
        nextWarningVisible[0] = true;
        setWarningVisible(nextWarningVisible);
    }

    function haveBook(){
        const nextWarningText = warningText.slice();
        nextWarningText[0] = "";
        setWarningText(nextWarningText);
        const nextWarningVisible = warningVisible.slice();
        nextWarningVisible[0] = false;
        setWarningVisible(nextWarningVisible);
    }

    function findBooks(){
        if(parseInt(data.books.length) === 0)
        {
            noBook();
        }
        else
        {
            haveBook();
        }
    }
    */

    const handleAddBook = async () => {
        //console.log(shelfNo);
        if(Number.isInteger(parseInt(shelfNo)))
        {
            if(parseInt(shelfNo) <= 6 && parseInt(shelfNo) > 0)
            {
                await createBook({
                    variables: { title, shelfNo },
                });
                setTitle("");
                setShelfNo("");
                refetch();
                //findBooks();
                validShelfNo();
            }
            else
            {
                invalidShelfNo();
            }
        } 
        else
        {
            invalidShelfNo();
        }
    };

    const handleAddBookEnter = async (e) => {
      console.log(e.key);
      if(e.key === "Enter")
      {
        handleAddBook();
      }
  };

    const handleDeleteBook = async (id) => {
        await deleteBook({ variables: { id } });
        //findBooks();
        refetch();
        const nextWarningText = warningText.slice();
        nextWarningText[1] = "Shelf is moving!";
        setWarningText(nextWarningText);
        const nextWarningVisible = warningVisible.slice();
        nextWarningVisible[1] = true;
        setWarningVisible(nextWarningVisible);;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container">
            <h1>Auto Shelf</h1>
            <h2>Current Status</h2>
            <Notice warningVisible={warningVisible[0]} warningText={warningText[0]}/>
            <ul>
                {data.books.map((book) => (
                    <li key={book.id}>
                        <span><b>{book.title}</b> (in shelf no.{book.shelfNo})</span>
                        <button onClick={() => handleDeleteBook(book.id)}>Take this stuff</button>
                    </li>
                ))}
            </ul>
            <h2>Add New Stuff</h2>
            <div className="form">
                <input
                    type="text"
                    placeholder="Stuff"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ShelfNo"
                    value={shelfNo}
                    onChange={(e) => setShelfNo(e.target.value)}
                />
                <Notice warningVisible={warningVisible[1]} warningText={warningText[1]}/>
                <button onClick={handleAddBook} onKeyDown={handleAddBookEnter}>Add Stuff</button>
            </div>
        </div>
    );
};

const Lobby = () => (
    <ApolloProvider>
        <Main />
    </ApolloProvider>
);

export default Lobby;