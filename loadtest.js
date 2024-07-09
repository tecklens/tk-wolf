import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Virtual Users
  duration: '5s', // Duration of the test
};

export default function () {
  const data = {
    workflowId: '665c005477c806d498a43195',
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
      Authorization: 'ApiKey 189a7b2dc04a1bd7f714de4d2d5ee668',
    },
  };

  let res = http.post(
    'http://localhost:5000/wolf/v1/trigger/',
    JSON.stringify(data),
    params,
  );

  check(res, { 'success send trigger': (r) => r.status === 201 });

  sleep(0.3);
}
