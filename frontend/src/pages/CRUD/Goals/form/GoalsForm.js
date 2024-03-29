import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import goalsFields from 'pages/CRUD/Goals/helpers/goalsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import Goal_categoriesSelectItem from 'pages/CRUD/Goal_categories/helpers/Goal_categoriesSelectItem';

import UsersSelectItem from 'pages/CRUD/Users/helpers/UsersSelectItem';

const GoalsForm = (props) => {

  const {
  isEditing,
  isProfile,
  findLoading,
  saveLoading,
  record,
  onSubmit,
  onCancel,
  modal
  } = props;

  const iniValues = () => {
  return IniValues(goalsFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(goalsFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(goalsFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'Edit My Profile';
  }

  return isEditing
  ? 'Edit Goals'
  : 'Add Goals';
  };

  const renderForm = () => (
  <Widget title={<h4>{title()}</h4>} collapse close>
  <Formik
          onSubmit={handleSubmit}
  initialValues={iniValues()}
  validationSchema={formValidations()}
  >
  {(form) => (
  <form onSubmit={form.handleSubmit}>
    <Grid container spacing={3} direction="column">

      <Grid item>
        <InputFormItem
          name={'name'}
          schema={goalsFields}

            autoFocus

        />
      </Grid>

      <Grid item>
        <Goal_categoriesSelectItem
        name={'category'}
        schema={goalsFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <UsersSelectItem
        name={'author'}
        schema={goalsFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'award'}
          schema={goalsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'start_date'}
          schema={goalsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'end_date'}
          schema={goalsFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'reason'}
          schema={goalsFields}

        />
      </Grid>

  </Grid>
  <Grid container spacing={3} mt={2}>
    <Grid item>
      <Button
        color="primary"
        variant="contained"
        onClick={form.handleSubmit}
      >
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={form.handleReset}
      >
        Reset
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
      </form>
      )
      }
    </Formik>
  </Widget>
  );
  if (findLoading) {
  return <Loader />;
  }
  if (isEditing && !record) {
  return <Loader />;
  }
  return renderForm();
  }
  export default GoalsForm;
