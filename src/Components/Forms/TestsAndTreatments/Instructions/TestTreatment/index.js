/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatment - A select box ,
 *                          holds the test and treatment instruction classifier.
 * @returns UI Field of the main form.
 */

import { Controller, useFormContext } from 'react-hook-form';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import TestTreatmentLockedText from 'Components/Forms/TestsAndTreatments/Helpers/TestTreatmentLockedText';
import {
  getValueSetFromLists,
  getValueSetLists,
} from 'Utils/Helpers/getValueSetArray';
import { StyledHiddenDiv } from 'Components/Forms/TestsAndTreatments/Style';

/**
 *
 * @param index
 * @param item
 * @returns UI Field of the main form.
 */
const TestTreatment = ({ index, item }) => {
  //console.log(`item from testTreatment ${index} - ${JSON.stringify(item)}`);
  const { control, watch, setValue } = useFormContext();

  const [
    collectedTestAndTreatmentsFromFhir,
    setCollectedTestAndTreatmentsFromFhir,
  ] = useState([]);
  const [
    collectedTestAndTreatmentsFromFhirObject,
    setCollectedTestAndTreatmentsFromFhirObject,
  ] = useState();
  useEffect(() => {
    (async () => {
      const testAndTreatmentsValuesetFromFhir = await FHIR(
        'ValueSet',
        'doWork',
        {
          functionName: 'getValueSet',
          functionParams: { id: 'tests_and_treatments' },
        },
      );

      const test_and_treatments_list = await getValueSetFromLists(
        testAndTreatmentsValuesetFromFhir,
        true,
      );
      setCollectedTestAndTreatmentsFromFhirObject(test_and_treatments_list);
      const testAndTreatmentObj = [];

      testAndTreatmentsValuesetFromFhir.data.expansion.contains.map(
        (testAndTreatment) => {
          const normalizedTestAndTreatmentsFromFhirValueSet = normalizeFhirValueSet(
            testAndTreatment,
          );
          testAndTreatmentObj.push({
            title: normalizedTestAndTreatmentsFromFhirValueSet.name,
            code: normalizedTestAndTreatmentsFromFhirValueSet.code,
          });
        },
      );

      setCollectedTestAndTreatmentsFromFhir(testAndTreatmentObj);
      setValue(`Instruction[${index}].test_treatment`, item.test_treatment);
      setValue(`Instruction[${index}].serviceReqID`, item.serviceReqID);
    })();
  }, []);

  const { t } = useTranslation();
  return collectedTestAndTreatmentsFromFhir &&
    collectedTestAndTreatmentsFromFhir.length > 0 ? (
    <>
      <StyledHiddenDiv dontDisplay={item.locked}>
        <Controller
          defaultValue={item.test_treatment}
          control={control}
          name={`Instruction[${index}].test_treatment`}
          onChange={([event]) => {
            setValue(
              `Instruction[${index}].test_treatment`,
              event.target.value,
            );
            watch(`Instruction`);
            return event.target.value;
          }}
          as={
            <CustomizedTextField
              select
              iconColor='#1976d2'
              width='100%'
              label={t('Test/Treatment')}>
              {collectedTestAndTreatmentsFromFhir.map((value, index) => {
                return (
                  <MenuItem key={index} value={value.code}>
                    {t(value.title)}
                  </MenuItem>
                );
              })}
            </CustomizedTextField>
          }
        />
      </StyledHiddenDiv>
      {item.locked ? (
        <TestTreatmentLockedText
          label={t('Test/Treatment')}
          name={`Instruction[${index}].test_treatment`}
          value={
            collectedTestAndTreatmentsFromFhirObject &&
            t(collectedTestAndTreatmentsFromFhirObject[item.test_treatment])
          }
        />
      ) : null}
    </>
  ) : null;
};
export default TestTreatment;
