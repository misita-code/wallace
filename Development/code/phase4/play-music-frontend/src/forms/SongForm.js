// src/forms/SongForm.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SongForm() {
  const initialValues = { title: '', artist: '', duration: '' };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    artist: Yup.string().required("Required"),
    duration: Yup.string().matches(/^\d+:\d{2}$/, "Format MM:SS").required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch("http://localhost:5000/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    .then(r => r.json())
    .then(data => {
      console.log(data);
      resetForm();
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <label>Title:</label>
        <Field name="title" />
        <ErrorMessage name="title" component="div" />

        <label>Artist:</label>
        <Field name="artist" />
        <ErrorMessage name="artist" component="div" />

        <label>Duration (MM:SS):</label>
        <Field name="duration" />
        <ErrorMessage name="duration" component="div" />

        <button type="submit">Add Song</button>
      </Form>
    </Formik>
  );
}

export default SongForm;
