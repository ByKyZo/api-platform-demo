import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { Book } from '../../types/Book';
import { fetch } from '../../utils/dataAccess';

interface Props {
    book: Book;
}

export const Show: FunctionComponent<Props> = ({ book }) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            console.log(book['@id']);
            await fetch(book['@id'].replace('/api', ''), { method: 'DELETE' });
            router.push('/books');
        } catch (error) {
            setError('Error when deleting the resource.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{`Show Book ${book['@id']}`}</h1>
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">title</th>
                        <td>{book['title']}</td>
                    </tr>
                    <tr>
                        <th scope="row">description</th>
                        <td>{book['description']}</td>
                    </tr>
                    <tr>
                        <th scope="row">author</th>
                        <td>{book['author']}</td>
                    </tr>
                    <tr>
                        <th scope="row">createAt</th>
                        <td>{book['createAt']}</td>
                    </tr>
                </tbody>
            </table>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <Link href="/books">
                <a className="btn btn-primary">Back to list</a>
            </Link>{' '}
            <Link href={`${book['@id'].replaceAll('/api', '')}/edit`}>
                <a className="btn btn-warning">Edit</a>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
                <a>Delete</a>
            </button>
        </div>
    );
};
