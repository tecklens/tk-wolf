import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // Virtual Users
  duration: '5s', // Duration of the test
};

export default function () {
  const data = {
    workflowId: '669266dafdec836446fe5b62',
    data: {},
    target: {
      subcriberId: 'abc',
      phone: '+84339210372',
      email: 'diep.tv1999@gmail.com',
      title: 'Data Analysis & Planning, Analyst (6Month Outsourcing Contract)',
      job_code: 'JOB-FKKUKK',
    },
    overrides: {},
  };

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'ApiKey d171212c22a1fa2b7b4643a75fbf3e8e',
    },
  };

  let res = http.post(
    'https://flow.wolfx.app/wolf/v1/trigger',
    JSON.stringify(data),
    params,
  );

  check(res, { 'success send trigger': (r) => r.status === 201 });

  sleep(0.3);
}
