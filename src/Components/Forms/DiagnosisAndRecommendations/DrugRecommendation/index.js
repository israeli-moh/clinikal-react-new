import React from 'react';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Grid, MenuItem } from '@material-ui/core';
import { StyledDivider } from '../Style';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Delete } from '@material-ui/icons';
import * as moment from 'moment';

const DrugRecommendation = () => {
  const { t } = useTranslation();
  const {
    control,
    permission,
    register,
    watch,
    requiredErrors,
    setRequiredErrors,
    reset,
    getValues,
  } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'drugRecommendation',
  });
  const drugRecommendation = watch('drugRecommendation');

  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const checkIsDisabled = (name, index) => {
    if (drugRecommendation[index] === undefined) {
      return true;
    } else {
      const value = drugRecommendation[index][name];
      if (!value) {
        return true;
      }
      return permission === 'view' ? true : false;
    }
  };

  return (
    <StyledFormGroup>
      <Grid container direction='row' justify='space-between'>
        <Title
          label={t('Drug Recommendation')}
          bold
          fontSize='22px'
          color='#000b40'
        />
        <StyledButton
          width='113px'
          disabled={permission === 'view' ? true : false}
          margin='0 16px'
          height='32px'
          color='primary'
          variant='outlined'
          size='small'
          onClick={() => {
            setRequiredErrors((prevState) => {
              const cloneState = [...prevState];
              cloneState.push({
                quantity: '',
                drugForm: '',
                drugRoute: '',
                intervals: '',
                duration: '',
              });
              return cloneState;
            });
            append({
              drugName: '',
              quantity: '',
              drugForm: '',
              drugRoute: '',
              intervals: '',
              duration: '',
              toDate: '',
              instructionsForTheDrug: '',
            });
          }}>{` + ${t('Add Drug')}`}</StyledButton>
      </Grid>
      <StyledDivider />
      {fields.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Controller
              name={`drugRecommendation[${index}].drugName`}
              control={control}
              value={value}
              defaultValue=''
              as={
                <CustomizedTextField
                  iconColor='#1976d2'
                  width='30%'
                  select
                  label={t('Drug Name')}
                  onChange={handleChange}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </CustomizedTextField>
              }
            />
            <Grid container direction='row' justify='space-between'>
              <CustomizedTextField
                name={`drugRecommendation[${index}].quantity`}
                inputRef={register()}
                label={`${t('Quantity')} *`}
                width='30%'
                type='number'
                disabled={checkIsDisabled('drugName', index)}
                inputProps={{
                  min: '1',
                }}
                error={requiredErrors[index].quantity.length ? true : false}
                helperText={requiredErrors[index].quantity}
              />
              <Controller
                control={control}
                name={`drugRecommendation[${index}].drugForm`}
                value={value}
                defaultValue=''
                error={requiredErrors[index].drugForm.length ? true : false}
                helperText={requiredErrors[index].drugForm}
                as={
                  <CustomizedTextField
                    disabled={checkIsDisabled('drugName', index)}
                    iconColor='#1976d2'
                    width='30%'
                    select
                    label={`${t('Drug form')} *`}
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomizedTextField>
                }
              />
              <Controller
                control={control}
                name={`drugRecommendation[${index}].drugRoute`}
                value={value}
                defaultValue=''
                error={requiredErrors[index].drugRoute.length ? true : false}
                helperText={requiredErrors[index].drugRoute}
                as={
                  <CustomizedTextField
                    disabled={checkIsDisabled('drugName', index)}
                    iconColor='#1976d2'
                    width='30%'
                    select
                    label={`${t('Drug route')} *`}
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomizedTextField>
                }
              />
            </Grid>
            <Grid container direction='row' justify='space-between'>
              <Controller
                control={control}
                value={value}
                name={`drugRecommendation[${index}].intervals`}
                defaultValue=''
                error={requiredErrors[index].intervals.length ? true : false}
                helperText={requiredErrors[index].intervals}
                as={
                  <CustomizedTextField
                    disabled={checkIsDisabled('drugName', index)}
                    iconColor='#1976d2'
                    width='30%'
                    select
                    label={`${t('Intervals')} *`}
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomizedTextField>
                }
              />
              <Controller
                control={control}
                name={`drugRecommendation[${index}].duration`}
                error={requiredErrors[index].duration.length ? true : false}
                helperText={requiredErrors[index].duration}
                onChange={([event]) => {
                  if (
                    parseInt(event.target.value, 10) > 0 &&
                    parseInt(event.target.value, 10) < 100
                  ) {
                    return event.target.value;
                  } else {
                    return event.target.value.slice(
                      0,
                      event.target.value.length - 1,
                    );
                  }
                }}
                as={
                  <CustomizedTextField
                    disabled={checkIsDisabled('drugName', index)}
                    label={`${t('Duration (days)')} *`}
                    width='30%'
                    type='number'
                  />
                }
              />
              <CustomizedTextField
                name={`drugRecommendation[${index}].toDate`}
                inputRef={register()}
                disabled
                label={t('To date')}
                width='30%'
              />
            </Grid>
            <Grid container direction='row' alignItems='baseline'>
              <CustomizedTextField
                disabled={checkIsDisabled('drugName', index)}
                name={`drugRecommendation[${index}].instructionsForTheDrug`}
                label={t('Instructions for the drug')}
                inputRef={register()}
              />
              <StyledButton
                width='113px'
                disabled={checkIsDisabled('drugName', index)}
                margin='0 16px'
                height='32px'
                color='primary'
                variant='outlined'
                size='small'>
                {t('Select template')}
              </StyledButton>
            </Grid>
            <Grid container direction='row' justify='flex-end'>
              <Delete
                color='primary'
                onClick={() => {
                  setRequiredErrors((prevState) => {
                    const cloneState = [...prevState];
                    cloneState.splice(index, 1);
                    return cloneState;
                  });
                  remove(index);
                }}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ cursor: 'pointer' }}>{t('Delete drug')}</span>
            </Grid>
          </React.Fragment>
        );
      })}
    </StyledFormGroup>
  );
};

export default DrugRecommendation;
