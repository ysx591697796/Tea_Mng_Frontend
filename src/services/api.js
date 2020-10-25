import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function helloc(params) {
  return request('/api/hello', {
    method: 'GET',
  });
}

export async function test(params) {
  return request('/api/test', {
    method: 'POST',
    // body: params,
    data: {
      ...params,
    }
  });
}

export async function login1(params) {
  return request('/api/login', {
    method: 'POST',
    // body: params,
    data: {
      ...params,
    }
  });
}

export async function getStuInfo(params) {
  return request('/api/stuinfo/queryinfo', {
    method: 'POST',
    // body: params,
    data: {
      ...params,
    }
  });
}

export async function getGrade(params) {
  return request('/api/getgrade', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function getClass(params) {
  return request('/api/getclass', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function getUser(params) {
  return request('/api/user', {
    method: 'GET',
    data: {
      ...params,
    }
  });
}

export async function getVacate(params) {
  return request('/api/getvacate', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function upInfoPhone(params) {
  return request('/api/stuinfo/upinfophone', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function getInfoList(params) {
  return request('/api/stuinfo/getinfolist', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function addVacate(params) {
  return request('/api/vacate/insertrecord', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function getVacateRed(params) {
  return request('/api/vacate/getvacatelist', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function updateVacate(params) {
  return request('/api/vacate/updatevacate', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function changeAgree(params) {
  return request('/api/vacate/changeagree', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

export async function changeRefuse(params) {
  return request('/api/vacate/changerefuse', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}