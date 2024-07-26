import { addDoc, collection } from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { errorToast, successToast } from '../../../utils/Toasts';

export const jobFormIsVerified = (job, selectedOptions) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^\d+$/;

  if (
    job.name.trim() === ''
        || job.jComBenefit.trim() === ''
        || job.externalLink.trim() === ''
        || job.jDescription.trim() === ''
        || job.jExpectation.trim() === ''
        || job.salary.trim() === ''
        || job.address.trim() === ''
        || job.jcomBlurb.trim() === ''
  ) {
    errorToast('Required fields cannot be left empty');
    return false;
  }
  if (selectedOptions.length === 0) {
    errorToast('No job titles were selected');
    return false;
  }
  if (job.companyEmail.trim() !== '' && !(emailRegex.test(job.companyEmail))) {
    errorToast('Please enter a valid email');
    return false;
  }
  if (job.phoneNumber.trim() !== '' && !(numberRegex.test(job.phoneNumber))) {
    errorToast('Please enter a number');
    return false;
  }

  return true;
};

export const serviceFormIsVerified = (service) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^\d+$/;

  if (
    service.consultType.trim() === ''
        || service.companyName.trim() === ''
        || service.address.trim() === ''
        || service.details.trim() === ''
  ) {
    errorToast('Required fields cannot be left empty');
    return false;
  }
  if (service.Expertise.length === 0) {
    errorToast('No expertise were selected');
    return false;
  }
  if (service.consultantEmail.trim() !== '' && !(emailRegex.test(service.consultantEmail))) {
    errorToast('Please enter a valid email');
    return false;
  }
  if (service.PhoneNumber.trim() !== '' && !(numberRegex.test(service.PhoneNumber))) {
    errorToast('Please enter a number');
    return false;
  }

  return true;
};

export const handleSubmitJob = async (job, selectedOptions, userData) => {
  const isVerified = jobFormIsVerified(job, selectedOptions);

  if (isVerified) {
    const updatedJob = {
      phoneNumber: job.phoneNumber,
      companyEmail: job.companyEmail,
      datePosted: new Date(),
      externalLink: job.externalLink,
      jComBenefit: job.jComBenefit,
      jDescription: job.jDescription,
      jExpectation: job.jExpectation,
      jMinEducation: job.jMinEducation,
      jcomBlurb: job.jcomBlurb,
      jobType: selectedOptions,
      jtravelReq: job.jtravelReq,
      lastEdited: new Date(),
      location: {
        locationIsSet: userData?.longitude !== 0,
        locationName: `${userData.town}, ${userData.state}`,
        state: userData.state,
        town: userData.town,
        coordinates: {
          longitude: userData?.longitude || 0,
          latitude: userData?.latitude || 0,
        },
      },
      name: job.name,
      postedFrom: 'Web',
      salary: job.salary,
      status: 'active',
      viewCount: [],
      vendor: {
        Company: job.Company,
        addresss: job.address,
        photoUrl: userData.photoURL,
        uid: userData.uid,
      },
    };

    await addDoc(collection(db, 'Job'), updatedJob);
    successToast('Job submitted successfully');
  }
};

export const handleSubmitService = async (service, userData) => {
  const isVerified = serviceFormIsVerified(service);

  if (isVerified) {
    const expertiseList = service.Expertise.join(', ');

    const updatedService = {
      Expertise: expertiseList,
      PhoneNumber: service.PhoneNumber,
      consultType: service.consultType,
      consultantEmail: service.consultantEmail,
      details: service.details,
      postedFrom: 'Web',
      serviceType: service.serviceType,
      status: 'active',
      lastEdited: new Date(),
      datePosted: new Date(),
      vendor: {
        Company: service.companyName,
        addresss: service.address,
        photoUrl: userData.photoURL,
        uid: userData.uid,
      },
      location: {
        locationIsSet: userData?.longitude !== 0,
        locationName: `${userData.town}, ${userData.state}`,
        state: userData.state,
        town: userData.town,
        coordinates: {
          longitude: userData?.longitude || 0,
          latitude: userData?.latitude || 0,
        },
      },
      viewCount: [],
    };

    await addDoc(collection(db, 'Consultants'), updatedService);
    successToast('Service submitted successfully');
  }
};
