import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Book } from "../../types/Book";

interface Props {
  book?: Book;
}

export const Form: FunctionComponent<Props> = ({ book }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(book["@id"], { method: "DELETE" });
      router.push("/books");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{book ? `Edit Book ${book["@id"]}` : `Create Book`}</h1>
      <Formik
        initialValues={book ? { ...book } : new Book()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/books" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/books");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_title">
                title
              </label>
              <input
                name="title"
                id="_title"
                value={values.title ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.title && touched.title ? " is-invalid" : ""
                }`}
                aria-invalid={errors.title && touched.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="title"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_description">
                description
              </label>
              <input
                name="description"
                id="_description"
                value={values.description ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.description && touched.description ? " is-invalid" : ""
                }`}
                aria-invalid={errors.description && touched.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="description"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_author">
                author
              </label>
              <input
                name="author"
                id="_author"
                value={values.author ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.author && touched.author ? " is-invalid" : ""
                }`}
                aria-invalid={errors.author && touched.author}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="author"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_createAt">
                createAt
              </label>
              <input
                name="createAt"
                id="_createAt"
                value={values.createAt ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.createAt && touched.createAt ? " is-invalid" : ""
                }`}
                aria-invalid={errors.createAt && touched.createAt}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="createAt"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/books">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {book && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
