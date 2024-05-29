import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import ApolloProvider from "./ApolloProvider";
import "./App.css";

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

const App = () => {
    const { loading, error, data, refetch } = useQuery(GET_BOOKS);
    const [createBook] = useMutation(CREATE_BOOK);
    const [deleteBook] = useMutation(DELETE_BOOK);

    const [title, setTitle] = useState("");
    const [shelfNo, setShelfNo] = useState("");
    const [warningText, setWarningText] = useState(null);
    const [warningVisible, setWarningVisible] = useState(null);
    //const [publishDate, setPublishDate] = useState("");

    function invalidShelfNo(){
        setWarningText('ShelfNo must be an Integer!')
        setWarningVisible(true)
    }

    function validShelfNo(){
        setWarningText('')
        setWarningVisible(false)
    }

    const handleAddBook = async () => {
        //console.log(shelfNo);
        if(Number.isInteger(parseInt(shelfNo)))
        {
            validShelfNo()
            await createBook({
                variables: { title, shelfNo },
            });
            refetch();
            setTitle("");
            setShelfNo("");
            //setPublishDate("");
        } 
        else
        {
            invalidShelfNo()
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
        refetch();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container">
            <h1>Books</h1>
            <ul>
                {data.books.map((book) => (
                    <li key={book.id}>
                        {book.title} (in shelf no.{book.shelfNo})
                        <button onClick={() => handleDeleteBook(book.id)}>Take this book</button>
                    </li>
                ))}
            </ul>
            <h2>Add a New Book</h2>
            <div className="form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ShelfNo"
                    value={shelfNo}
                    onChange={(e) => setShelfNo(e.target.value)}
                />
                <Notice warningVisible={warningVisible} warningText={warningText}/>
                <button onClick={handleAddBook} onKeyDown={handleAddBookEnter}>Add Book</button>
            </div>
        </div>
    );
};

const WrappedApp = () => (
    <ApolloProvider>
        <App />
    </ApolloProvider>
);

export default WrappedApp;