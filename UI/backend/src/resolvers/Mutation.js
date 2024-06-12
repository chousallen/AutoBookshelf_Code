import { books, lastId } from '../data/books.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = promisify(exec);
const booksFilePath = path.resolve(__dirname, '../data/books.js');

const saveBooks = (newLastId) => {
    const content = `export let lastId = ${newLastId}\nexport let books = ${JSON.stringify(books, null, 2)};\n`;
    fs.writeFileSync(booksFilePath, content, 'utf8');
};

export const Mutation = {
    createBook: async (_, { title, shelfNo }) => {
        const newBook = {
            id: lastId + 1,
            title,
            shelfNo
        };
        const command = `python ./src/py/main.py --message "#s00${newBook.shelfNo - 1}aaaaaaaaaa"`;
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
        let newLastId = lastId + 1;
        books.push(newBook);
        saveBooks(newLastId);
        return newBook;
    },
    deleteBook: async (_, { id }) => {
        const bookIndex = books.findIndex((book) => book.id === parseInt(id));
        if (bookIndex === -1) return null;
        else
        {
            const book = books[bookIndex];
            const command = `python ./src/py/main.py --message "#s00${book.shelfNo - 1}aaaaaaaaaa"`;
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
        saveBooks(lastId);
        return deletedBook;
    },
    kill: async (_, { id }) => {
        const bookIndex = books.findIndex((book) => book.id === parseInt(id));
        //const command = `python ./src/py/main.py --message "${book.shelfNo}"`;
        const command = `python ./src/py/main.py --message "#s009aaaaaaaaaa"`;
        //console.log(`python ./src/py/main.py --message "${book.shelfNo}"`);
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
        return books[bookIndex];
    }
};