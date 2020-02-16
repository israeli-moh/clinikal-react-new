// noinspection JSClosureCompilerSyntax
/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param appointment - object
 * @param patientsObj - object
 * @returns {}
 */
const normalizeFhirAppointment = (appointment) => {
    //TODO change the optional chaining, supported only by Google chrome version 79 experimental API.

    // const participantPatient = appointment.participant?.find(actorObj => actorObj.actor.reference.includes('Patient')).actor.reference.split("/")[1];
    // const participantHealthcareService = appointment.participant?.find(actorObj => actorObj.actor.reference.includes('HealthcareService')).actor.reference.split("/")[1];
    // const examinationCode = appointment.reasonCode.map(reasonCodeObj => reasonCodeObj.coding[0].code);
    // const examination = appointment.reasonCode.map(reasonCodeObj => reasonCodeObj.text);
    // const serviceType = appointment.serviceType.map(serviceTypeObj => serviceTypeObj.text);
    // const serviceTypeCode = appointment.serviceType.map(serviceTypeObj => serviceTypeObj.coding[0].code);

    let serviceType = null;
    let serviceTypeCode = null;
    if(appointment.serviceType.length > 0){
        if(appointment.serviceType.every(serviceTypeObj => serviceTypeObj.coding)){
            serviceTypeCode = appointment.serviceType.map(serviceTypeCodeObj => serviceTypeCodeObj.coding[0].code);
            serviceType = appointment.serviceType.map(serviceTypeObj => serviceTypeObj.text);
        }
    }

    let participantPatient = null;
    let participantHealthcareService = null;
    if (appointment.participant.length > 0) {
        participantPatient = appointment.participant.find(actorObj => actorObj.actor.reference.includes('Patient'));
        participantPatient = participantPatient ? participantPatient.actor.reference.split('/')[1] : null;

        participantHealthcareService = appointment.participant.find(actorObj => actorObj.actor.reference.includes('HealthcareService'));
        participantHealthcareService = participantHealthcareService ? participantHealthcareService.actor.reference.split('/')[1] : null;
    }

    let examinationCode = null;
    let examination = null;
    if (appointment.reasonCode.length > 0){
        if(appointment.reasonCode.every(reasonCodeObj => reasonCodeObj.coding)){
            examinationCode = appointment.reasonCode.map(reasonCodeObj => reasonCodeObj.coding[0].code);
            examination = appointment.reasonCode.map(reasonCodeObj => reasonCodeObj.text);
        }
    }

    return {
        id: appointment.id,
        priority: appointment.priority,
        status: appointment.status,
        time: appointment.start,
        examinationCode,
        examination,
        participantHealthcareService,
        serviceType,
        serviceTypeCode,
        participantPatient
    };
};

export default normalizeFhirAppointment;
