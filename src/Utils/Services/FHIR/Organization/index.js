/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a organization strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - gigiidan@gmail.com
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import {CRUDOperations} from "../CRUDOperations";

const OrganizationStats =   {
    doWork : (parameters) => {
        let  componentFhirURL = "/Organization";
        parameters.url =  componentFhirURL;
        return OrganizationStats[parameters.functionName](parameters);
    },
    getOrganizationTypeKupatHolim : async (params) => {
        //return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=71`);
        return await CRUDOperations('search', `${params.url}?type=71`);

    },

    getOrganization : async (params) => {
       // return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=11`);
        return await CRUDOperations('search', `${params.url}?type=11`);
    }
};

export default function Organization(action = null, params = null) {

    if (action) {
        const transformer = OrganizationStats[action] ?? OrganizationStats.__default__;
        return transformer(params);
    }
}
