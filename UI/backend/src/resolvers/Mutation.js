import { books } from '../data/books.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

let lastId = books.length

export const Mutation = {
    createBook: (_, { title, shelfNo }) => {
        const newBook = {
            id: lastId + 1,
            title,
            shelfNo
        };
        lastId++;
        books.push(newBook);
        return newBook;
    },
    deleteBook: async (_, { id }) => {
        const bookIndex = books.findIndex((book) => book.id === parseInt(id));
        if (bookIndex === -1) return null;
        else
        {
            const book = books[bookIndex];
            const command = `python ./src/py/main.py --message "${book.shelfNo}"`;
            console.log(`python ./src/py/main.py --message "${book.shelfNo}"`);
            try {
                const { stdout, stderr } = await execPromise(command);
                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                    throw new Error(`Error: ${stderr}`);
                }
                console.log(`Stdout: ${stdout}`);
            } catch (error) {
                console.error(`Error: ${error.message}`);
                throw new Error(`Error: ${error.message}`);
            }
        }
        const [deletedBook] = books.splice(bookIndex, 1);
        return deletedBook;
    }
};