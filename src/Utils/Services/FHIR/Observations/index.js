/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a Observations strategy  which handles old fhirAPI code logic
 */

import moment from 'moment';
import { CRUDOperations } from '../CRUDOperations';
import { store } from '../../../../index';
/*import denormalizeFhirObservation from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirObservation';*/

const Observations = {
  doWork: (parameters) => {
    let componentFhirURL = '/Observation';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return Observations[parameters.functionName](paramsToCRUD);
  },

  createNewObservation: (params) => {},
  updateObservation: (params) => {},
  deleteObservation: (params) => {},
  getObservations: (params) => {
    return {
      id: '4',
      resourceType: 'Observation',
      status: '1',
      category: [
        {
          text: 'vital-signs ',
        },
      ],
      subject: {
        reference: 'Patient/2',
      },
      encounter: {
        reference: 'Encounter/1',
      },
      issued: '2020-06-22T07:51:00.000Z',
      performer: [
        {
          reference: 'Practitioner/1',
        },
      ],
      note: [
        {
          text: 'דיאטה דחוף ',
        },
      ],
      component: {
        '1': {
          valueQuantity: {
            value: '120',
            system: 'http://loinc.org',
            code: '8480-6',
          },
        },
        '2': {
          valueQuantity: {
            value: '80',
            system: 'http://loinc.org',
            code: '8462-4',
          },
        },
        '3': {
          valueQuantity: {
            value: '198.42',
            system: 'http://loinc.org',
            code: '8335-2',
          },
        },
        '4': {
          valueQuantity: {
            value: '72.05',
            system: 'http://loinc.org',
            code: '8308-9',
          },
        },
        '5': {
          valueQuantity: {
            value: '97.87',
            system: 'http://loinc.org',
            code: '8310-5',
          },
        },
        '6': {
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://loinc.org/8327-9',
                code: 'Rectal',
              },
            ],
          },
        },
        '7': {
          valueQuantity: {
            value: '75.00',
            system: 'http://loinc.org',
            code: '69000-8',
          },
        },
        '8': {
          valueQuantity: {
            value: '60.00',
            system: 'http://loinc.org',
            code: '9303-9',
          },
        },
        '9': {
          valueQuantity: {
            value: '26.9',
            system: 'http://loinc.org',
            code: '39156-5',
          },
        },
        '10': {
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://loinc.org/59574-4',
                code: 'Normal BL',
              },
            ],
          },
        },
        '11': {
          valueQuantity: {
            value: '72.00',
            system: 'http://loinc.org',
            code: '8280-0',
          },
        },
        '12': {
          valueQuantity: {
            value: '19.69',
            system: 'http://loinc.org',
            code: '8287-5',
          },
        },
        '13': {
          valueQuantity: {
            value: '30.00',
            system: 'http://loinc.org',
            code: '20564-1',
          },
        },
        '14': {
          valueQuantity: {
            value: '120',
            system: 'http://loinc.org',
            code: '74774-1',
          },
        },
        '15': {
          valueQuantity: {
            value: '8',
            system: 'http://loinc.org',
            code: '72514-3',
          },
        },
      },
    };
  },
};

export default function Observation(action = null, params = null) {
  if (action) {
    const transformer = Observations[action] ?? Observations.__default__;
    return transformer(params);
  }
}
