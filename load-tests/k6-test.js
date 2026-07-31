import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // 100 concurrent users
  duration: '1m', // 1 minute duration
  thresholds: {
    // Fail if average response time exceeds 1500ms
    http_req_duration: ['avg<1500'],
  },
};

export default function () {
  // Simulating API calls to the local web server or a mock endpoint
  let res = http.get('http://localhost:19006');
  
  check(res, {
    'status was 200': (r) => r.status === 200,
    'transaction time OK': (r) => r.timings.duration < 1500,
  });
  
  sleep(1);
}
