import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 400, // Virtual Users
  duration: '5s', // Duration of the test
};

export default function () {
  const data = {
    workflowId: '66810e9daf8b2fec595f7039',
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
      Authorization: 'ApiKey a105c8a49df5c03e3c4eddc23b5e0782',
    },
  };

  let res = http.post(
    'https://flow.wolfx.app/wolf/v1/trigger/',
    JSON.stringify(data),
    params,
  );

  check(res, { 'success send trigger': (r) => r.status === 201 });

  sleep(0.3);
}
