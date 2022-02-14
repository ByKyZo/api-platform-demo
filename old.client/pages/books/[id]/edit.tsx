import { NextComponentType, NextPageContext } from 'next';
import Head from 'next/head';
import { Form } from '../../../components/book/Form';
import { Book } from '../../../types/Book';
import { fetch } from '../../../utils/dataAccess';

interface Props {
    book: Book;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ book }) => {
    return (
        <div>
            <div>
                <Head>
                    <title>{book && `Edit Book ${book['@id']}`}</title>
                </Head>
            </div>
            <Form book={book} />
        </div>
    );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
    const book = await fetch(asPath.replace('/edit', ''));
    // const book = await fetch(asPath);

    return { book };
};

export default Page;
