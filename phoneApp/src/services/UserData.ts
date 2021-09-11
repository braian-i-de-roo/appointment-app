import {SecureStorageRef} from '../providers/secureStorage/SecureStorageContext';
const apiUrl: String = 'http://192.168.0.102:8091';

export interface Appointment {
  time: String;
  doctorName: String;
}

export const getAppointments = async (): Promise<Array<Appointment>> => {
  const aux = SecureStorageRef.current.get;
  const user = await aux("user")
  console.log("user")
  console.log(user)
  const url = apiUrl + '/appointments/' + user;
  return fetch(url).then(r => r.json()).catch(x => {
    console.log('an error occurred');
    console.log(x);
  });
};

export const requestAppointment = (
  user: String,
  doctor: String,
  time: String,
  onSuccess: () => void,
  onFailure: () => void,
): void => {
  console.log(onFailure)
  const url = apiUrl + '/appointments/' + user;
  const data = {
    doctor,
    desiredTime: time,
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(x => {
      if (x.ok) {
        onSuccess();
      } else {
        onFailure();
      }
    })
    .catch(x => {
      console.log('error requesting appointment');
      console.log(x);
      onFailure();
    });
};
